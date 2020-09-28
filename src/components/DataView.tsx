import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';

import './DataView.css';

interface IDataViewProps {}

interface IPlotState {
  isActive: boolean;
  testStr: string;
}

let getComponentPlotState: { (): IPlotState };
let setComponentPlotState: { (newState: IPlotState): void };

export function setTest(newVal: string) {
  const newState = getComponentPlotState();
  newState.testStr = 'Hello world!';
  setComponentPlotState(newState);
}

export default class DataView extends React.Component<
  IDataViewProps,
  IPlotState
> {
  constructor(props: IDataViewProps) {
    super(props);
    this.state = {
      isActive: false,
      testStr: ''
    };

    getComponentPlotState = () => {
      return this.state;
    };
    setComponentPlotState = (newState) => {
      this.state = newState;
      this.forceUpdate();
    };
  }
  render() {
    return (
      <Paper className="dataViewContainer">
        {this.state.isActive ? (
          <Plot
            data={[
              {
                type: 'scatter',
                x: [1, 2, 3],
                y: [2, 6, 3],
                marker: { color: 'red' }
              },
              {
                type: 'bar',
                x: [1, 2, 3],
                y: [2, 5, 3]
              }
            ]}
            layout={{
              title: 'Hello World',
              autosize: true
            }}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Typography className="placeholderText">
            Data visualizations will appear here
          </Typography>
        )}
        <p>{this.state.testStr}</p>
      </Paper>
    );
  }
}
