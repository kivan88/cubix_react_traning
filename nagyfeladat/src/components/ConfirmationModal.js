import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function ConfirmationModal({onClose, onConfirm, message}) {

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{"Confirmation required"}</DialogTitle>
            <DialogContent>
                <Typography variant={"body1"}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {
                    onConfirm();
                    onClose();
                }}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}