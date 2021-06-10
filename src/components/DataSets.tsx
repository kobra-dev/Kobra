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
import { DataSet } from "../utils/types";

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

    const transformedArray: DataSet[] = datasets.map((dataset) =>
        JSON.parse(dataset)
    );

    return (
        <div className={styles.container}>
            <div className={styles.uploadSection}>
                <FileUpload dataSetList={datasets} />
            </div>
            <Divider />
            <h3 className={styles.dHeader}>Uploaded datsets</h3>

            {transformedArray && (
                <List>
                    {transformedArray.map((dataset: DataSet) => (
                        <ListItem key={`${dataset.name}`}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={dataset.name} />

                            <ListItemSecondaryAction
                                onClick={async () => {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete ${dataset.name}`
                                        )
                                    ) {
                                        const deleteResp =
                                            await gqlDeleteDataSet({
                                                variables: {
                                                    key: JSON.stringify(dataset)
                                                }
                                            });

                                        const deleteDataReq = await fetch(
                                            `${process.env.NEXT_PUBLIC_DATASET_API}/${dataset.key}`,
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
