import React from "react";
import { Paper, Typography, withStyles } from "@material-ui/core";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-cartesian-dist-min";

import { deepCopy } from "../blocks/DataView_block";
import { DarkContext } from "./DarkThemeProvider";

const Plot = createPlotlyComponent(Plotly);

interface IDataViewProps {
    classes: any;
}

export interface IPlotState {
    isActive: boolean;
    plotData: Plotly[];
    plotTitle: string;
}

let getComponentPlotState: { (): IPlotState };
let setComponentPlotState: { (newState: IPlotState): void };

export function editState(mutation: { (currentState: IPlotState): void }) {
    let state = getComponentPlotState();
    mutation(state);
    setComponentPlotState(state);
}

export function getState(): IPlotState {
    return getComponentPlotState();
}

export function resetState() {
    editState((state) => {
        Object.keys(defaultDataViewState).forEach((key) => {
            // @ts-ignore
            state[key] = deepCopy(defaultDataViewState[key]);
        });
    });
}

export const defaultDataViewState = {
    isActive: false,
    plotData: [],
    plotTitle: ""
};

/*export default function DataView(props : IDataViewProps) {
  const [state, setState] = useState(deepCopy(defaultDataViewState));
  getComponentPlotState = () => { return state; }
  setComponentPlotState = newState => {
    setState(newState);
  };

  const { isDark } = useDarkTheme();
  const bgcolor = isDark ? "rgb(30, 30, 30)" : "#ffffff";

  return (
    <Paper className={"dataViewContainer" + (isDark ? " dataview-dark-theme" : "")}>
      { state.isActive
      ? <Plot
      data={ state.plotData }
      layout={{
        title: state.plotTitle,
        autosize: true,
        margin: {
          l: 30,
          r: 30,
          b: 30,
          t: state.plotTitle.length === 0 ? 30 : 50
        },
        plot_bgcolor: bgcolor,
        paper_bgcolor: bgcolor,
        font: {
          color: isDark ? "#999" : "#444"
        }
      }}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />
    : <Typography className="placeholderText">Data visualizations will appear here</Typography>
    }
    </Paper>
  );
}*/

class DataView extends React.Component<IDataViewProps, IPlotState> {
    static contextType = DarkContext;

    constructor(props: IDataViewProps) {
        super(props);
        this.state = deepCopy(defaultDataViewState);

        getComponentPlotState = () => {
            return this.state;
        };
        setComponentPlotState = (newState) => {
            this.setState(newState);
            this.forceUpdate();
        };
    }

    render() {
        const [isDark] = this.context;
        const bgcolor = isDark ? "rgb(30, 30, 30)" : "#ffffff";

        return (
            <Paper
                className={
                    this.props.classes.dataViewContainer +
                    (isDark ? " " + this.props.classes.darkTheme : "")
                }
            >
                {this.state.isActive ? (
                    <Plot
                        data={this.state.plotData}
                        layout={{
                            title: this.state.plotTitle,
                            autosize: true,
                            margin: {
                                l: 30,
                                r: 30,
                                b: 30,
                                t: this.state.plotTitle.length === 0 ? 30 : 50
                            },
                            plot_bgcolor: bgcolor,
                            paper_bgcolor: bgcolor,
                            font: {
                                color: isDark ? "#999" : "#444"
                            }
                        }}
                        useResizeHandler
                        style={{ width: "100%", height: "100%" }}
                    />
                ) : (
                    <Typography className={this.props.classes.placeholderText}>
                        Data visualizations will appear here
                    </Typography>
                )}
            </Paper>
        );
    }
}

export default withStyles((theme) => ({
    dataViewContainer: {
        minHeight: 0
    },
    placeholderText: {
        color: "grey",
        textAlign: "center",
        marginTop: "1em !important"
    },
    darkTheme: {
        "& .js-plotly-plot .gridlayer path": {
            stroke: "#424242 !important"
        }
    }
}))(DataView);
