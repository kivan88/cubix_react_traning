import {Button, Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddDogCard() {
    const navigate = useNavigate();
    const onClick = (id) => {
        navigate("/new");
    }

    return (
        <Grid item xs={12}>
            <Button variant={"contained"} onClick={onClick} fullWidth>New</Button>
        </Grid>
    );
}

export default AddDogCard;