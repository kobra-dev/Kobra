import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DataView from "./DataView";
import { makeStyles, Paper } from "@material-ui/core";
import { TabContext } from "@material-ui/lab";
import firebase from "../utils/firebase";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import { DataSets } from "./DataSets";
import { useGetUserDataSetLazyQuery } from "../generated/queries";

interface TabPanelsProps {
    value: number;
    className?: string;
    children: React.ReactNodeArray;
}

const tabPanelsUseStyles = makeStyles(() => ({
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

const useStyles = makeStyles(() => ({
    topView: {
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        flex: 1,
        minHeight: 0
    },
    tabPanel: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        "& > *": {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflowY: "auto",
            "& > *": {
                flex: 1,
                minHeight: 0
            }
        }
    }
}));

export function TopView() {
    const [value, setValue] = useState(0);
    const [datasets, setDatasets] = useState([]);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const [user] = useAuthState(firebase.auth());

    const [
        gqlGetDataSets,
        { loading: data_sets_loading, data: data_set_results }
    ] = useGetUserDataSetLazyQuery();

    const styles = useStyles();

    useEffect(() => {
        gqlGetDataSets({
            variables: {
                id: user.uid
            }
        });

        if (!data_sets_loading && data_set_results) {
            setDatasets(data_set_results.user.datasets);
            globalThis.dataSetsList = data_set_results.user.datasets;
        }
    }, [datasets, user, data_sets_loading, gqlGetDataSets, data_set_results]);

    return (
        <div className={styles.topView}>
            <Paper
                style={{ width: "100%!important" }}
                className={styles.topView + " " + styles.paper}
            >
                <TabContext value={String(value)}>
                    <Tabs
                        variant="fullWidth"
                        textColor="primary"
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="Data Visualization" />
                        <Tab label="Data sets" />
                    </Tabs>
                    <TabPanels className={styles.tabPanel} value={value}>
                        <DataView />
                        <DataSets datasets={datasets} />
                    </TabPanels>
                </TabContext>
            </Paper>
        </div>
    );
}
