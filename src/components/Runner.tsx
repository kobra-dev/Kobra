import React, { useState } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import { Paper, Button } from '@material-ui/core';
import { PlayArrow, Check } from '@material-ui/icons';
import './Runner.css';
import { runInContext } from './RunnerContext';

interface IRunnerProps {
  getCode : { () : string; }
}

export default function Runner(props : IRunnerProps) {
  const [runnerConsole, setRunnerConsole] = useState(null as Console | null);

  function run() : void {
    const source : string = props.getCode();
    //const source = "console.log(RunnerContext);";

    //const runnerContext = new RunnerContext();
    const runResult = runInContext(source);

    if(runResult[0] !== "") {
      // There was an exception
      console.log("EXCEPTION");
      console.log(runResult[0]);
      console.log(runResult[1]);
    }
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
      </div>
      <Console key={ "runnerconsole" }
        ref={ ref => setRunnerConsole(ref) }
        handler={ processUserInput }
        promptLabel={ "> " }
        welcomeMessage={ 'The output of your program will be displayed here' }
        autofocus={false}
      />
    </Paper>
  );
}