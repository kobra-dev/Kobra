import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DataView from "./DataView";
import FileUpload from "./FileUpload";
import {
    IconButton,
    makeStyles,
    Paper,
    ListItem,
    List,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction
} from "@material-ui/core";
import { TabContext } from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";
import firebase from "../utils/firebase";
import { useAuthState } from "@kobra-dev/react-firebase-auth-hooks/auth";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSnackbar } from "notistack";

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

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const [user] = useAuthState(firebase.auth());

    const styles = useStyles();

    useEffect(() => {
        async function getDataSets() {
            fetch(process.env.NEXT_PUBLIC_GQL_API_UPDATED, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: (await getToken()) as unknown as string
                },
                body: JSON.stringify({
                    query: `query GetUser($id: String!) {
                           user(id: $id) {
                                 id
                                 bio
                                 url
                                 datasets
                            }
                        }
                    `,
                    variables: {
                        id: user.uid
                    }
                })
            })
                .then((resp) => resp.json())
                .then((result) => setDatasets(result.data.user.datasets));
        }
        globalThis.datasets = datasets;
        getDataSets();
    }, [datasets, user.uid]);

    async function getToken() {
        const token = await firebase.auth().currentUser?.getIdToken();

        if (token === undefined) return {};

        return token;
    }

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
                        <div style={{ overflow: "scoll" }}>
                            <div style={{ height: "8rem" }}>
                                <FileUpload />
                            </div>
                            <Divider />
                            <h3
                                style={{
                                    textAlign: "center",
                                    fontSize: "1rem"
                                }}
                            >
                                Uploaded datsets
                            </h3>

                            {datasets && (
                                <List>
                                    {datasets.map((dataset) => (
                                        <ListItem key={`${dataset}`}>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    dataset.split("&#$@")[1]
                                                }
                                            />

                                            <ListItemSecondaryAction
                                                onClick={async () => {
                                                    if (
                                                        confirm(
                                                            `Are you sure you want to delete ${
                                                                dataset.split(
                                                                    "&#$@"
                                                                )[1]
                                                            }`
                                                        )
                                                    ) {
                                                        fetch(
                                                            `${process.env.NEXT_PUBLIC_GQL_API_UPDATED}`,
                                                            {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                    Authorization:
                                                                        (await getToken()) as unknown as string
                                                                },
                                                                body: JSON.stringify(
                                                                    {
                                                                        query: `mutation deleteDataSet($key: String!){
                                                                                    removeDataSet(dataSetKey:$key){
                                                                                                id
                                                                                                datasets
                                                                                  }
                                                                                }`,
                                                                        variables:
                                                                            {
                                                                                key: dataset
                                                                            }
                                                                    }
                                                                )
                                                            }
                                                        )
                                                            .then((resp) =>
                                                                resp.json()
                                                            )
                                                            .then((result) =>
                                                                console.log(
                                                                    result
                                                                )
                                                            )
                                                            .catch((error) => {
                                                                console.log(
                                                                    error
                                                                );
                                                            });

                                                        console.log({
                                                            dataset
                                                        });
                                                        const dataset_pattern =
                                                            dataset
                                                                .split(
                                                                    "&#$@"
                                                                )[0]
                                                                .trim();

                                                        const datasetKey =
                                                            dataset_pattern.split(
                                                                "/"
                                                            );

                                                        fetch(
                                                            `${
                                                                process.env
                                                                    .NEXT_PUBLIC_DATASET_API
                                                            }/${
                                                                datasetKey[
                                                                    datasetKey.length -
                                                                        1
                                                                ]
                                                            }`,
                                                            {
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                    Authorization:
                                                                        (await getToken()) as unknown as string
                                                                },
                                                                method: "DELETE"
                                                            }
                                                        )
                                                            .then((resp) =>
                                                                resp.json()
                                                            )
                                                            .then((result) => {
                                                                if (
                                                                    result.message ===
                                                                    "File doesn't exists"
                                                                ) {
                                                                    enqueueSnackbar(
                                                                        "File doesn't exists",
                                                                        {
                                                                            variant:
                                                                                "error"
                                                                        }
                                                                    );
                                                                    return;
                                                                }

                                                                enqueueSnackbar(
                                                                    "Successfully deleted",
                                                                    {
                                                                        variant:
                                                                            "success"
                                                                    }
                                                                );
                                                            })
                                                            .catch((error) => {
                                                                console.error(
                                                                    error
                                                                );
                                                            });
                                                    }
                                                }}
                                            >
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </div>
                    </TabPanels>
                </TabContext>
            </Paper>
        </div>
    );
}
