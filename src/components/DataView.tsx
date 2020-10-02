import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Plot from 'react-plotly.js';

import './DataView.css';
import { deepCopy } from '../blocks/DataView_block';

interface IDataViewProps {
  isDarkTheme: boolean
}

export interface IPlotState {
  isActive : boolean
  plotData : Plotly.Data[],
  plotTitle : string
}

let getComponentPlotState: { (): IPlotState };
let setComponentPlotState: { (newState: IPlotState): void };

export function editState(mutation : { (currentState : IPlotState) : void }) {
  let state = getComponentPlotState();
  mutation(state);
  setComponentPlotState(state);
}

export function getState() : IPlotState {
  return getComponentPlotState();
}

export const defaultDataViewState = {
  isActive: false,
  plotData: [],
  plotTitle: ""
};

export default class DataView extends React.Component<
  IDataViewProps,
  IPlotState
> {
  constructor(props: IDataViewProps) {
    super(props);
    this.state = deepCopy(defaultDataViewState);
    
    getComponentPlotState = () => { return this.state; };
    setComponentPlotState = newState => {
      this.setState(newState);
      this.forceUpdate();
    };
  }

  render() {
    const bgcolor = this.props.isDarkTheme ? "rgb(30, 30, 30)" : "#ffffff";

    return (
      <Paper className={"dataViewContainer" + (this.props.isDarkTheme ? " dataview-dark-theme" : "")}>
        { this.state.isActive
        ? <Plot
        data={ this.state.plotData }
        layout={{
          title: this.state.plotTitle,
          autosize: true,
          margin: {
            l: 30,
            r: 30,
            b: 30,
            t: 30
          },
          plot_bgcolor: bgcolor,
          paper_bgcolor: bgcolor,
          font: {
            color: this.props.isDarkTheme ? "#999" : "#444"
          }
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
      : <Typography className="placeholderText">Data visualizations will appear here</Typography>
      }
      </Paper>
    );
  }
}
