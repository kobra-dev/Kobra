import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export default function DeleteConfirmationDialog(props: {
    open: boolean;
    onClose: { (del: boolean): void };
}) {
    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Deleting the project is irreversible. Please be certain.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.onClose(false)}>Cancel</Button>
            <Button onClick={() => props.onClose(true)}>Delete</Button>
        </DialogActions>
    </Dialog>;
}
