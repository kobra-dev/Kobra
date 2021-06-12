import FileUpload, { setDataBlockEnabled } from "./FileUpload";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    ListItemSecondaryAction,
    Typography
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import { useSnackbar } from "notistack";
import { getToken } from "../utils/apolloClient";
import { useDeleteDataSetMutation } from "../generated/queries";
import { DataSet } from "../utils/types";
import { useContext } from "react";
import { DatasetsContext } from "./TopView";

const useStyles = makeStyles(() => ({
    container: {
        width: "100%"
    },
    uploadSection: {
        height: "8rem"
    },
    dsList: {
        padding: "1rem",
        "& > *": {
            textAlign: "center"
        }
    }
}));

export function DataSets() {
    const { enqueueSnackbar } = useSnackbar();
    const [gqlDeleteDataSet] = useDeleteDataSetMutation();
    const [datasets, setDatasets] = useContext(DatasetsContext);

    const styles = useStyles();

    async function deleteDataset(dataset: DataSet) {
        // TODO: use MUI dialog
        if (window.confirm(`Are you sure you want to delete ${dataset.name}`)) {
            const deleteResp = await gqlDeleteDataSet({
                variables: {
                    key: JSON.stringify(dataset)
                }
            });

            const deleteDataReq = await fetch(
                `${process.env.NEXT_PUBLIC_DATASET_API}/${dataset.key}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: await getToken()
                    },
                    method: "DELETE"
                }
            );

            const deleteApiResp = await deleteDataReq.json();

            if (
                deleteResp.data.removeDataSet &&
                deleteApiResp.message === "File deleted"
            ) {
                setTimeout(() => {
                    enqueueSnackbar("Deleted successfully", {
                        variant: "success"
                    });
                }, 500);
                // Remove from cache
                delete globalThis.datasetCache[dataset.name];
                // Remove from datasets
                setDatasets(
                    datasets.filter((dsItem) => dsItem.key !== dataset.key)
                );
                // Disable blocks
                setDataBlockEnabled(dataset.name, false);
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.uploadSection}>
                <FileUpload />
            </div>
            {datasets.length > 0 && (
                <>
                    <Divider />
                    <div className={styles.dsList}>
                        <Typography variant="h6">Uploaded datasets</Typography>
                        <List>
                            {datasets.map((dataset: DataSet) => (
                                <ListItem key={`${dataset.name}`}>
                                    <ListItemText primary={dataset.name} />
                                    <ListItemSecondaryAction
                                        onClick={() => deleteDataset(dataset)}
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
                    </div>
                </>
            )}
        </div>
    );
}
