import {Button, Card, CardMedia, CardContent, CardActions, Grid, Typography} from '@mui/material';

function DogCard({dog, onNavigateToDog, onDeleteDog}) {
  return (
    <Grid item xs={12} md={4} lg={3}>
        <Card>
            <CardMedia component="img" image={dog?.image} height="150"/>
            <CardContent>
                <Typography variant="h5">{dog?.name}</Typography>
            </CardContent>
            <CardActions>
                <Button variant={"contained"} onClick={() => {
                    onNavigateToDog(dog?.id);
                }} fullWidth>Modify</Button>
                <Button variant={"contained"} color="error" onClick={() => {
                    onDeleteDog(dog?.id);
                }} fullWidth>Delete</Button>
            </CardActions>
        </Card>
    </Grid>
  );
}

export default DogCard;