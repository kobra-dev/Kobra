import React, { useState } from 'react';
import Blockly from 'blockly/core';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import { Paper, Button } from '@material-ui/core';
import { PlayArrow, Check, Clear } from '@material-ui/icons';
import './Runner.css';
import { runInContext, highlightBlock, RunResult } from './RunnerContext';

interface IRunnerProps {
  getCode : { () : string; }
}

export default function Runner(props : IRunnerProps) {
  const [runnerConsole, setRunnerConsole] = useState(null as Console | null);

  function run() : void {
    runnerConsole?.setBusy(true);
    runnerConsole?.logX("run-start", "Run started at " + new Date().toLocaleTimeString());

    const source : string = props.getCode();
    const runResult : RunResult | undefined = runInContext(source);

    if(!(runResult === undefined)) {
      // There was an exception
      runnerConsole?.logX("exception", "EXCEPTION");
      
      if(runResult.blockId === undefined) {
        runnerConsole?.logX("exception-details", "Block type: could not be identified");
        runnerConsole?.logX("exception-details", "This usually means you did not connect a required input to a block");
      }
      else {
        // Get block
        // @ts-ignore
        const block = Blockly.getMainWorkspace().getBlockById(runResult.blockId);
        runnerConsole?.logX("exception-details", "Block type: " + block.type);
      }
      
      runnerConsole?.logX("exception-details", runResult.exception);
    }

    highlightBlock("");
    runnerConsole?.logX("run-end", "Run ended at " + new Date().toLocaleTimeString());
    runnerConsole?.setBusy(false);
  }

  function verify() : void {
    const source : string = props.getCode();
    // TODO: fill predef
    //const jshintResults = JSHINT(source, { undef: false }, {});
    //const jshintResults = getJsHintResults(source);
    //console.log(jshintResults);
    console.log(source);
    //runnerConsole?.log(source);
  }

  function processUserInput(text : string) {
    runnerConsole?.setBusy(false);
  }

  function setRunnerConsoleGlobal(ref : Console | null) {
    globalThis.runnerConsole = ref;
    return setRunnerConsole(ref);
  }

  return (
    <Paper className="runnerContainer">
      <div key={"runnercontrols"} className="runnerControls">
        <Button startIcon={<PlayArrow />} onClick={ run }>
          Run
        </Button>
        <Button startIcon={<Check />} onClick={ verify }>
          Verify
        </Button>
        <Button startIcon={<Clear />} onClick={ () => { runnerConsole?.clearScreen(); } } className="clearButton">
          Clear
        </Button>
      </div>
      <Console key={ "runnerconsole" }
        ref={ ref => setRunnerConsoleGlobal(ref) }
        handler={ processUserInput }
        promptLabel={ "> " }
        welcomeMessage={ 'The output of your program will be displayed here' }
        autofocus={false}
      />
    </Paper>
  );
}