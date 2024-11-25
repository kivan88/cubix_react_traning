import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function ConfirmationModal({onClose, onConfirm}) {

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{"Confirm delete"}</DialogTitle>
            <DialogContent>
                <Typography variant={"body1"}>Do you really want to delete this?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}