import React, { useState, useEffect, createContext } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DataView from "./DataView";
import { makeStyles, Paper } from "@material-ui/core";
import { TabContext } from "@material-ui/lab";
import firebase from "../utils/firebase";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import { DataSets } from "./DataSets";
import { useGetUserDataSetLazyQuery } from "../generated/queries";
import DataSetsLoggedOut from "./DataSetsLoggedOut";
import { DataSet } from "src/utils/types";

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

export const DatasetsContext = createContext(
    {} as [DataSet[], React.Dispatch<React.SetStateAction<DataSet[]>>]
);

export function TopView() {
    const [value, setValue] = useState(0);
    const [datasets, setDatasets] = useState<DataSet[]>([]);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    //#region Dataset fetching code

    const [user] = useAuthState(firebase.auth());

    useEffect(() => {
        globalThis.dataSetsList = datasets;
    }, [datasets]);

    const [gqlGetDataSets] = useGetUserDataSetLazyQuery({
        onCompleted(data) {
            setDatasets(
                data.user?.datasets.map((item: string) => JSON.parse(item)) ??
                    []
            );
        }
    });

    const styles = useStyles();

    useEffect(() => {
        if (user) {
            gqlGetDataSets({
                variables: {
                    id: user.uid
                }
            });
        } else {
            setDatasets([]);
            globalThis.datasetCache = [];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    //#endregion

    return (
        <DatasetsContext.Provider value={[datasets, setDatasets]}>
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
                            <Tab label="Datasets" />
                            <Tab label="Models" />
                        </Tabs>
                        <TabPanels className={styles.tabPanel} value={value}>
                            <DataView />
                            {user ? <DataSets /> : <DataSetsLoggedOut />}
                        </TabPanels>
                    </TabContext>
                </Paper>
            </div>
        </DatasetsContext.Provider>
    );
}
