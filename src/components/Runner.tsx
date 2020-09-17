import React from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';

interface RunnerConsoleState {
    count: number;
}

class RunnerConsole extends React.Component<{}, RunnerConsoleState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            count: 0
        };
    }

    child : {
        console? : Console,
    } = {};

    echo = (text: string) => {
        this.child.console?.log(text);
        this.setState({count: this.state.count + 1}, this.child.console?.return);
    }

    promptLabel = () => {
        return this.state.count + "> ";
    }

    render() {
        return (
            <Console ref={ ref => this.child.console = nullConsoleToUndefined(ref) }
                     handler={ this.echo }
                     promptLabel={ this.promptLabel }
                     welcomeMessage={"The output of your program will be displayed here"}
                     autofocus={ false }
            />
        );
    }
}

export default function Runner() {
    return (
        <div>
            <p key={ "controls" }>Hello world from Runner!</p>
            <RunnerConsole key={ "runnerconsole" }/>
        </div>
    );
}

function nullConsoleToUndefined(console : Console | null) : Console | undefined{
    if(console === null) {
        return undefined as Console | undefined;
    }
    else {
        return console as Console | undefined;
    }
}