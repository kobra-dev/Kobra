import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Blockly from 'blockly/core';
import Console, { ConsoleState } from 'react-console-component';
import 'react-console-component/main.css';
import { Paper, Button, makeStyles } from '@material-ui/core';
import { PlayArrow, FileCopy, Clear } from '@material-ui/icons';
import { runInContext, highlightBlock, RunResult } from './RunnerContext';
import { useDarkTheme } from './DarkThemeProvider';
import { dv_reset } from 'src/blocks/DataView_block';

type RunnerGetState = Readonly<ConsoleState> | undefined;
type RunnerSetState = {(newState: ConsoleState): void};
type RunnerResetState = {(): void};

interface IRunnerProps {
  getCode: { (): string };
}

const useStyles = makeStyles((theme) => ({
  runnerContainer: {
    display: "flex",
    flexDirection: "column",
    "& .react-console-container": {
      flex: "1 1 1px"
    },
    "& .react-console-message": {
      whiteSpace: "normal"
    },
    "& .react-console-message-run-start, .react-console-message-run-end, .react-console-message-exception": {
      fontWeight: "bolder",
      fontSize: "1.1em"
    },
    "& .react-console-message-run-start, .react-console-message-run-end": {
      color: "#595959 !important"
    },
    "& .react-console-message-exception": {
      color: "red !important"
    },
    "& .react-console-message-exception-message": {
      fontWeight: "bolder"
    }
  },
  consoleDarkTheme: {
    "& .react-console-container": {
      backgroundColor: "rgb(30, 30, 30)"
    }
  },
  runnerControls: {
    margin: "0.5rem"
  },
  floatRight: {
    float: "right"
  }
}));

export interface RunnerRef {
  state: RunnerGetState,
  setState: RunnerSetState,
  resetState: RunnerResetState
}

function Runner({ getCode }: IRunnerProps, ref: any) {
  const styles = useStyles();
  const [runnerConsoleKey, setRunnerConsoleKey] = useState(0);
  const runnerConsole = useRef<Console>(null);
  let userInputCallback: { (result: string): void } | undefined;
  const { isDark } = useDarkTheme();

  useImperativeHandle<unknown, RunnerRef>(ref, () => ({
    state: runnerConsole.current?.state,
    setState: (newState: ConsoleState) => {
      runnerConsole.current?.setState(newState);
    },
    resetState: () => {
      setRunnerConsoleKey(runnerConsoleKey + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [runnerConsoleKey, runnerConsole.current?.state]);

  async function run(): Promise<void> {
    runnerConsole.current?.setBusy(true);
    runnerConsole.current?.logX(
      'run-start',
      'Run started at ' + new Date().toLocaleTimeString()
    );

    const source: string = getCode();

    globalThis.runnerConsole = runnerConsole.current;
    globalThis.runnerConsoleGetInput = runnerConsoleGetInput;
    dv_reset();
    const runResult: RunResult | undefined = await runInContext(source);
    delete globalThis.runnerConsole;
    delete globalThis.runnerConsoleGetInput;

    if (!(runResult === undefined)) {
      // There was an exception
      runnerConsole.current?.logX('exception', 'Error');

      let text: string | undefined = undefined;
      if (runResult.blockId !== undefined) {
        // Get block
        // @ts-ignore
        const block = Blockly.getMainWorkspace().getBlockById(
          runResult.blockId
        );
        if (block !== null) {
          const blockType = block.type;
          // Get text
          text = block.inputList
              .map((input) =>
                  input.fieldRow
                      .filter((field) => field instanceof Blockly.FieldLabel)
                      .map((field) => field.value_)
                      .join("")
              )
              .join(" _ ")
              // The last field could have an input so we need to check
              + (block.inputList[block.inputList.length - 1].connection ? " _" : "");
            if(!text) {
              // Fallback
              text = blockType.replace("_", " ");
            }
        }
      }

      if (!text) {
        runnerConsole.current?.logX(
          'exception-details',
          'Block type: could not be identified'
        );
        runnerConsole.current?.logX(
          'exception-details',
          'This may mean that you did not connect a required input to a block'
        );
      } else {
        runnerConsole.current?.logX('exception-details', 'Block type: ' + text);
      }

      runnerConsole.current?.logX('exception-details', runResult.exception);
      if(text) {
        runnerConsole.current?.logX('exception-details', "The block that caused the problem has been highlighted");
      }

      // Now log in browser console
      console.log('%cException in generated code', 'color: red');
      console.log(runResult.exception);
      console.log('Generated code:');
      console.log(source);
    }
    else {
      highlightBlock('');
    }

    runnerConsole.current?.logX(
      'run-end',
      'Run ended at ' + new Date().toLocaleTimeString()
    );
    runnerConsole.current?.setBusy(false);
  }

  function copyLog(): void {
    let output = '';
    runnerConsole.current?.state.log?.forEach((logEntry) => {
      if (logEntry.command.length > 0) {
        output += logEntry.label + logEntry.command + '\n';
      }
      logEntry.message.forEach((logMessage) => {
        output += logMessage.value + '\n';
      });
    });

    if (!navigator.clipboard) {
      runnerConsole.current?.logX(
        'exception-details',
        'Your browser does not support the Clipboard API.'
      );
      return;
    }

    navigator.clipboard.writeText(output).then(
      () => {},
      (err) => {
        runnerConsole.current?.logX('exception-details', 'Error copying text: ' + err);
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
      runnerConsole.current?.setBusy(false);
    }
  }

  return (
    <Paper className={styles.runnerContainer + (isDark ? " " + styles.consoleDarkTheme : "")}>
      <div key={'runnercontrols'} className={styles.runnerControls}>
        <Button startIcon={<PlayArrow />} onClick={run}>
          Run
        </Button>
        <div className={styles.floatRight}>
          <Button startIcon={<FileCopy />} onClick={copyLog}>
            Copy log
          </Button>
          <Button
            startIcon={<Clear />}
            onClick={() => {
              runnerConsole.current?.clearScreen();
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <Console
        key={'runnerconsole' + runnerConsoleKey}
        ref={runnerConsole}
        handler={processUserInput}
        promptLabel={'> '}
        welcomeMessage={'The output of your program will be displayed here'}
        autofocus={false}
      />
    </Paper>
  );
}

const RefRunner = forwardRef(Runner);
export default RefRunner;