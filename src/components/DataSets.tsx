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
                                        // Handle delete here
                                        const deleteResp =
                                            await gqlDeleteDataSet({
                                                variables: {
                                                    datasetKey: dataset
                                                }
                                            });

                                        console.log(deleteResp);

                                        /* const dataset_pattern = dataset */
                                        /*     .split("&#$@")[0] */
                                        /*     .trim(); */

                                        /* const datasetKey = */
                                        /*     dataset_pattern.split("/"); */

                                        /* fetch( */
                                        /*     `${ */
                                        /*         process.env */
                                        /*             .NEXT_PUBLIC_DATASET_API */
                                        /*     }/${ */
                                        /*         datasetKey[ */
                                        /*             datasetKey.length - 1 */
                                        /*         ] */
                                        /*     }`, */
                                        /*     { */
                                        /*         headers: { */
                                        /*             "Content-Type": */
                                        /*                 "application/json", */
                                        /*             Authorization: */
                                        /*                 (await getToken()) as unknown as string */
                                        /*         }, */
                                        /*         method: "DELETE" */
                                        /*     } */
                                        /* ) */
                                        /*     .then((resp) => resp.json()) */
                                        /*     .then((result) => { */
                                        /*         if ( */
                                        /*             result.message === */
                                        /*             "File doesn't exists" */
                                        /*         ) { */
                                        /*             enqueueSnackbar( */
                                        /*                 "File doesn't exists", */
                                        /*                 { */
                                        /*                     variant: "error" */
                                        /*                 } */
                                        /*             ); */
                                        /*             return; */
                                        /*         } */

                                        /*         enqueueSnackbar( */
                                        /*             "Successfully deleted", */
                                        /*             { */
                                        /*                 variant: "success" */
                                        /*             } */
                                        /*         ); */
                                        /*     }) */
                                        /*     .catch((error) => { */
                                        /*         console.error(error); */
                                        /*     }); */
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
