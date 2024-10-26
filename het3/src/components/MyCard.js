import {Button, Card, CardActions, CardContent, CardMedia} from "@mui/material";

function MyCard(props){
    return (
        <Card>
            <CardMedia component="img" image={props.cardImage} height="150px"/>
                <CardContent>{props.cardText}</CardContent>
            <CardActions>
                <Button color={"info"} variant={"contained"} fullWidth>Details</Button>
            </CardActions>
        </Card>
    );
}

export default MyCard;