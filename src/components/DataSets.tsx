import FileUpload from "./FileUpload";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    ListItemSecondaryAction
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import { useSnackbar } from "notistack";
import { getToken } from "../utils/apolloClient";
import { useDeleteDataSetMutation } from "../generated/queries";

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        overflowY: "scroll"
    },
    uploadSection: {
        height: "8rem"
    },
    dHeader: {
        textAlign: "center",
        fontSize: "1rem"
    }
}));

export function DataSets({ datasets }: { datasets: string[] }) {
    const { enqueueSnackbar } = useSnackbar();
    const [gqlDeleteDataSet] = useDeleteDataSetMutation();

    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.uploadSection}>
                <FileUpload dataSetList={datasets} />
            </div>
            <Divider />
            <h3 className={styles.dHeader}>Uploaded datsets</h3>

            {datasets && (
                <List>
                    {datasets.map((dataset: string) => (
                        <ListItem key={`${dataset}`}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={dataset.split("&#$@")[1]} />

                            <ListItemSecondaryAction
                                onClick={async () => {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete ${
                                                dataset.split("&#$@")[1]
                                            }`
                                        )
                                    ) {
                                        const deleteResp =
                                            await gqlDeleteDataSet({
                                                variables: {
                                                    key: dataset
                                                }
                                            });

                                        const deleteDataReq = await fetch(
                                            `${
                                                process.env
                                                    .NEXT_PUBLIC_DATASET_API
                                            }/${dataset.split("&#$@")[0]}`,
                                            {
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                    Authorization:
                                                        await getToken()
                                                },
                                                method: "DELETE"
                                            }
                                        );

                                        const deleteApiResp =
                                            await deleteDataReq.json();

                                        if (
                                            deleteResp.data.removeDataSet &&
                                            deleteApiResp.message ===
                                                "File deleted"
                                        )
                                            setTimeout(() => {
                                                enqueueSnackbar(
                                                    "Deleted successfully",
                                                    {
                                                        variant: "success"
                                                    }
                                                );
                                            }, 500);
                                    }
                                }}
                            >
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}
