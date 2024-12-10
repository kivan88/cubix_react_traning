import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export default function ConfirmationModal({onClose, onConfirm, message}) {

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Confirmation required</DialogTitle>
            <DialogContent>
                <Typography variant={"body1"}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onClose}>Cancel</Button>
                <Button variant={"contained"} color={"error"} onClick={() => {
                    onConfirm();
                    onClose();
                }}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}