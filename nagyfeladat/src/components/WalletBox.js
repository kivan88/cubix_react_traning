import {Button, Card, CardContent, CardActions, Grid, IconButton, Typography} from '@mui/material';
import {DeleteOutline, EditOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

function WalletBox({id, name, description, shared, onDelete}) {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant={"contained"} onClick={()=>{
                    navigate(`/me/wallet/${id}`);
                  }} fullWidth>Details</Button>
                {shared===false && <IconButton aria-label="Edit" onClick={()=>{
                    navigate(`/me/wallet/${id}/edit`);
                  }}>
                  <EditOutlined />
                </IconButton>}
                {onDelete && <IconButton aria-label="Delete" onClick={onDelete}>
                  <DeleteOutline />
                </IconButton>}
            </CardActions>
        </Card>
    </Grid>
  );
}

export default WalletBox;