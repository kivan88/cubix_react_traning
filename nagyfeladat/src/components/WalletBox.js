import {Button, Card, CardContent, CardActions, Grid, IconButton, Typography} from '@mui/material';
import {DeleteOutline, EditOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

function WalletBox() {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
            <CardContent>
                <Typography variant="h5">{"Name"}</Typography>
                <Typography variant="body1">{"Description"}</Typography>
            </CardContent>
            <CardActions>
                <Button variant={"contained"} onClick={()=>{
                    navigate(`/me/wallet/1`); // ${id}
                  }} fullWidth>Details</Button>
                <IconButton aria-label="Edit" onClick={()=>{
                    navigate(`/me/wallet/1/edit`); // ${id}
                  }}>
                  <EditOutlined />
                </IconButton>
                <IconButton aria-label="Delete">
                  <DeleteOutline />
                </IconButton>
            </CardActions>
        </Card>
    </Grid>
  );
}

export default WalletBox;