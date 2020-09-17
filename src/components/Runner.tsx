import React from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import { Paper, Button } from '@material-ui/core';
import { PlayArrow, Check } from '@material-ui/icons';
import './Runner.css';

interface RunnerConsoleState {
  count: number;
}

class RunnerConsole extends React.Component<{}, RunnerConsoleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };
  }

  child: {
    console?: Console;
  } = {};

  echo = (text: string) => {
    this.child.console?.log(text);
    this.setState({ count: this.state.count + 1 }, this.child.console?.return);
  };

  promptLabel = () => {
    return this.state.count + '> ';
  };

  render() {
    return (
      <Console
        ref={(ref) => (this.child.console = nullConsoleToUndefined(ref))}
        handler={this.echo}
        promptLabel={this.promptLabel}
        welcomeMessage={'The output of your program will be displayed here'}
        autofocus={false}
      />
    );
  }
}

export default function Runner() {
  return (
    <Paper className="runnerContainer">
      <div key={"runnercontrols"} className="runnerControls">
        <Button startIcon={<PlayArrow />}>
          Play
        </Button>
        <Button startIcon={<Check />}>
          Verify
        </Button>
      </div>
      <RunnerConsole key={"runnerconsole"} />
    </Paper>
  );
}

function nullConsoleToUndefined(console: Console | null): Console | undefined {
  if (console === null) {
    return undefined as Console | undefined;
  } else {
    return console as Console | undefined;
  }
}
