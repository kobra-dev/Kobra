import React, { useState } from 'react';
import Blockly from 'blockly/core';
import Console, { ConsoleState } from 'react-console-component';
import 'react-console-component/main.css';
import { Paper, Button } from '@material-ui/core';
import { PlayArrow, FileCopy, Clear } from '@material-ui/icons';
import './Runner.css';
import { runInContext, highlightBlock, RunResult } from './RunnerContext';
import { useDarkTheme } from './DarkThemeProvider';

let runnerGetConsoleState: { (): Readonly<ConsoleState> | undefined };
let runnerSetConsoleState: { (newState: ConsoleState): void };
let runnerResetConsoleState: { (): void };

export function getConsoleState() {
  return runnerGetConsoleState();
}

export function setConsoleState(newState: ConsoleState) {
  runnerSetConsoleState(newState);
}

export function resetConsoleState() {
  runnerResetConsoleState();
}

interface IRunnerProps {
  getCode: { (): string };
}

export default function Runner(props: IRunnerProps) {
  const [runnerConsole, setRunnerConsole] = useState(null as Console | null);
  const [runnerConsoleKey, setRunnerConsoleKey] = useState(0);
  let userInputCallback: { (result: string): void } | undefined;
  const { isDark } = useDarkTheme();

  runnerGetConsoleState = () => {
    return runnerConsole?.state;
  };
  runnerSetConsoleState = (newState) => {
    runnerConsole?.setState(newState);
  };
  runnerResetConsoleState = () => {
    setRunnerConsoleKey(runnerConsoleKey + 1);
  };

  async function run(): Promise<void> {
    runnerConsole?.setBusy(true);
    runnerConsole?.logX(
      'run-start',
      'Run started at ' + new Date().toLocaleTimeString()
    );

    const source: string = props.getCode();

    globalThis.runnerConsole = runnerConsole;
    globalThis.runnerConsoleGetInput = runnerConsoleGetInput;
    const runResult: RunResult | undefined = await runInContext(source);
    delete globalThis.runnerConsole;
    delete globalThis.runnerConsoleGetInput;

    if (!(runResult === undefined)) {
      // There was an exception
      runnerConsole?.logX('exception', 'EXCEPTION');

      let blockType: string | undefined = undefined;
      if (runResult.blockId !== undefined) {
        // Get block
        // @ts-ignore
        const block = Blockly.getMainWorkspace().getBlockById(
          runResult.blockId
        );
        if (block !== null) {
          blockType = block.type;
        }
      }

      if (blockType === undefined) {
        runnerConsole?.logX(
          'exception-details',
          'Block type: could not be identified'
        );
        runnerConsole?.logX(
          'exception-details',
          'This usually means you did not connect a required input to a block'
        );
      } else {
        runnerConsole?.logX('exception-details', 'Block type: ' + blockType);
      }

      runnerConsole?.logX('exception-details', runResult.exception);

      // Now log in browser console
      console.log('%cException in generated code', 'color: red');
      console.log(runResult.exception);
      console.log('Generated code:');
      console.log(source);
    }

    highlightBlock('');
    runnerConsole?.logX(
      'run-end',
      'Run ended at ' + new Date().toLocaleTimeString()
    );
    runnerConsole?.setBusy(false);
  }

  function copyLog(): void {
    let output = '';
    runnerConsole?.state.log?.forEach((logEntry) => {
      if (logEntry.command.length > 0) {
        output += logEntry.label + logEntry.command + '\n';
      }
      logEntry.message.forEach((logMessage) => {
        output += logMessage.value + '\n';
      });
    });

    if (!navigator.clipboard) {
      runnerConsole?.logX(
        'exception-details',
        'Your browser does not support the Clipboard API.'
      );
      return;
    }

    navigator.clipboard.writeText(output).then(
      () => {},
      (err) => {
        runnerConsole?.logX('exception-details', 'Error copying text: ' + err);
      }
    );
  }

  function runnerConsoleGetInput(): Promise<string> {
    return new Promise((resolve) => {
      userInputCallback = (result) => {
        resolve(result);
        userInputCallback = undefined;
      };
    });
  }

  function processUserInput(text: string) {
    if (!(userInputCallback === undefined)) {
      userInputCallback(text);
    } else {
      runnerConsole?.setBusy(false);
    }
  }

  return (
    <Paper
      className={
        'runnerContainer' + (isDark ? ' react-console-dark-theme' : '')
      }
    >
      <div key={'runnercontrols'} className="runnerControls">
        <Button startIcon={<PlayArrow />} onClick={run}>
          Run
        </Button>
        <div className="right">
          <Button startIcon={<FileCopy />} onClick={copyLog}>
            Copy log
          </Button>
          <Button
            startIcon={<Clear />}
            onClick={() => {
              runnerConsole?.clearScreen();
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <Console
        key={'runnerconsole' + runnerConsoleKey}
        ref={(ref) => setRunnerConsole(ref)}
        handler={processUserInput}
        promptLabel={'> '}
        welcomeMessage={'The output of your program will be displayed here'}
        autofocus={false}
      />
    </Paper>
  );
}
