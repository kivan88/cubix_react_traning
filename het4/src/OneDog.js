import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import {useDogContext} from './utils/data';

function OneDog() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {dogs, updateDog, getDogById} = useDogContext();
  const [image, setImage] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    const dog = getDogById(id);
    if (dog) {
      setImage(dog.image);
      setName(dog.name);
    }
  }, [id, dogs, getDogById]);

  const handleSave = () => {
    updateDog({id: id,
      name: name,
      image: image
    });
    navigate("/");
  };
  
  return (
    <Container maxWidth={'lg'}>
      <Paper style={{ padding: "16px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}> 
            <Typography variant={'h4'}>{name}</Typography>
          </Grid>  
          <Grid item xs={12} md={6}>    
            <TextField 
                label="Name" 
                variant="outlined" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>    
            <TextField 
                label="Url" 
                variant="outlined" 
                value={image} 
                onChange={(e) => setImage(e.target.value)}
                fullWidth/>
          </Grid>
          <Grid item xs={12}> 
            <Button variant={"contained"} onClick={handleSave} fullWidth>Mentés</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default OneDog;