import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function AddTransactionModal({open, setOpen, onConfirm}) {
    return (
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <DialogTitle>{"Add transaction"}</DialogTitle>
            <DialogContent>
                <Typography variant={"body1"}>Do you really want to delete this?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)}>Cancel</Button>
                <Button onClick={onConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}