import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";

export default function MessageModal({onClose, message, title}) {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography variant={"body1"}>
                {message}
            </Typography>
        </DialogContent>
    </Dialog>)
}