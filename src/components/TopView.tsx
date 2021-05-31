import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DataView from "./DataView";
import FileUpload from "./FileUpload";
/* import TutorialsView from "./TutorialsView"; */
import { makeStyles, Paper } from "@material-ui/core";
import { TabContext } from "@material-ui/lab";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface TabPanelsProps {
    value: number;
    className?: string;
    children: React.ReactNodeArray;
}

const tabPanelsUseStyles = makeStyles((theme) => ({
    hiddenTab: {
        display: "none !important"
    }
}));

function TabPanels(props: TabPanelsProps) {
    const styles = tabPanelsUseStyles();
    return (
        <div className={props.className}>
            {props.children.map((child, index) => (
                <div
                    key={index}
                    className={index === props.value ? "" : styles.hiddenTab}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    topView: {
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        flex: 1,
        minHeight: 0
    },
    tabPanel: {
        /* flex: 1, */
        /* display: "flex", */
        /* flexDirection: "column", */
        /* minHeight: 0 */
        /* /1* "& > *": { *1/ */
        /*     flex: 1, */
        /*     display: "flex", */
        /*     flexDirection: "column", */
        /*     minHeight: 0, */
        /*     overflowY: "auto", */
        /*     "& > *": { */
        /*         flex: 1, */
        /*         minHeight: 0 */
        /*     } */
        /* } */
    }
}));

export function TopView() {
    const [value, setValue] = useState(0);
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
    const styles = useStyles();

    const GETDATASETS = gql`
        query GetDatsetsByUser {
            user {
                id
                name
                datasets
            }
        }
    `;

    const { loading, error, data } = useQuery(GETDATASETS);

    return (
        <div className={styles.topView}>
            <Paper
                style={{ width: "100%!important" }}
                className={styles.topView + " " + styles.paper}
            >
                <TabContext value={String(value)}>
                    <Tabs
                        textColor="primary"
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="Data Visualization" />
                        <Tab label="Data sets" />
                        {/* <Tab label="Tutorials" /> */}
                    </Tabs>
                    <TabPanels className={styles.tabPanel} value={value}>
                        <DataView />
                        <div style={{ overflow: "scoll" }}>
                            <div>
                                <FileUpload />
                            </div>
                            <h3>Uploaded datsets</h3>

                            {loading && <p>Loading........</p>}
                            {error && (
                                <p>
                                    <pre>{JSON.stringify(error, null, 4)}</pre>
                                </p>
                            )}
                            {data && (
                                <p>
                                    <pre>{JSON.stringify(data, null, 4)}</pre>
                                </p>
                            )}
                        </div>
                        {/* <div style={{ overflow: "scoll" }}> */}
                        {/*     <TutorialsView /> */}
                        {/* </div> */}
                    </TabPanels>
                </TabContext>
            </Paper>
        </div>
    );
}
