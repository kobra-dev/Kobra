import FileUpload, {
    setDataBlockEnabled
} from "./FileUpload";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    ListItemSecondaryAction,
    Typography,
    Button,
    DialogTitle,
    useMediaQuery,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    useTheme
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import { useSnackbar } from "notistack";
import { getToken } from "../utils/apolloClient";
import { useDeleteDataSetMutation } from "../generated/queries";
import { DataSet } from "../utils/types";
import { Fragment, useContext, useState } from "react";
import { DatasetsContext } from "./TopView";
import { Edit } from "@material-ui/icons";
import EditDatasetDialog from "./dialogs/EditDatasetDialog";

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
    const [datasets, setDatasets] =
        useContext(DatasetsContext);
    const theme = useTheme();
    const fullScreen = useMediaQuery(
        theme.breakpoints.down("sm")
    );

    const [
        isConfirmationModalOpen,
        setConfirmationModalOpen
    ] = useState<boolean>(false);

    const [dataSetToDelete, setDataSetToDelete] =
        useState<DataSet>();

    const [editingDataset, setEditingDataset] =
        useState<string | undefined>(undefined);

    const styles = useStyles();

    const handleConfiramtionModal = () =>
        setConfirmationModalOpen(!isConfirmationModalOpen);

    async function deleteDataset() {
        setConfirmationModalOpen(false);

        const deleteResp = await gqlDeleteDataSet({
            variables: {
                key: JSON.stringify(dataSetToDelete)
            }
        });

        const deleteDataReq = await fetch(
            `${process.env.NEXT_PUBLIC_DATASET_API}/${dataSetToDelete.key}`,
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
            enqueueSnackbar("Deleted successfully", {
                variant: "success"
            });
            // Remove from cache
            delete globalThis.datasetCache[
                dataSetToDelete.name
            ];
            // Remove from datasets
            setDatasets(
                datasets.filter(
                    (dsItem) =>
                        dsItem.key !== dataSetToDelete.key
                )
            );
            // Disable blocks
            setDataBlockEnabled(
                dataSetToDelete.name,
                false
            );
            setDataSetToDelete(null);
        }
    }

    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.uploadSection}>
                    <FileUpload />
                </div>
                {datasets.length > 0 && (
                    <>
                        <Divider />
                        <div className={styles.dsList}>
                            <Typography variant="h6">
                                Uploaded datasets
                            </Typography>
                            <List>
                                {datasets.map(
                                    (dataset: DataSet) => (
                                        <ListItem
                                            key={`${dataset.name}`}
                                        >
                                            <ListItemIcon>
                                                <DescriptionIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    dataset.name
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    aria-label="edit"
                                                    onClick={() =>
                                                        setEditingDataset(
                                                            dataset.name
                                                        )
                                                    }
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        setDataSetToDelete(
                                                            dataset
                                                        );
                                                        handleConfiramtionModal();
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </div>
                    </>
                )}
            </div>

            <Dialog
                fullScreen={fullScreen}
                open={isConfirmationModalOpen}
                onClose={handleConfiramtionModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure you want to delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`${dataSetToDelete?.name}  dataset will be removed completely!`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleConfiramtionModal}
                        color="primary"
                    >
                        cancel
                    </Button>
                    <Button
                        onClick={deleteDataset}
                        color="primary"
                        autoFocus
                    >
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <EditDatasetDialog
                name={editingDataset}
                setNameUndefined={() =>
                    setEditingDataset(undefined)
                }
            />
        </Fragment>
    );
}
