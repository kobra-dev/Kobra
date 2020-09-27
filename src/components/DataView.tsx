import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import Plot from 'react-plotly.js';
//import { Chart } from 'react-charts';

import './DataView.css';

interface IDataViewProps {
  isActive : boolean
}

// props : IDataViewProps

export default function DataView() {
  const data = React.useMemo(
    () => [{
      label: "Series test",
      data: [
        { primary: 1, secondary: 10 },
        { primary: 2, secondary: 20 },
        { primary: 3, secondary: 30 },
        { primary: 4, secondary: 40 },
        { primary: 5, secondary: 50 }
    ]}], []
  );
  const series = React.useMemo(
    () => ({
      showPoints: false
    }), []
  );
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom"
      },
      {
        type: "linear",
        position: "left"
      }
    ],
    []
  );

  return (
    <Paper className="dataViewContainer">
      {false
      ? <p>Data visualizations will appear here</p>
      : /*<Chart data={ data } series={ series } axes={ axes } />*/<Plot
      data={[
        {
          type: 'scatter',
          x: [1, 2, 3],
          y: [2, 6, 3],
          marker: {color: 'red'}
        },
        {
          type: 'bar',
          x: [1, 2, 3],
          y: [2, 5, 3]
        }
      ]}
      layout={{
        title: 'Hello World',
        autosize: true,
      }}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />}
    </Paper>
  );
}