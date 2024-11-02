import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import {useDogContext} from '../utils/data';

function NewDog() {
  const navigate = useNavigate();
  const {addDog} = useDogContext();
  const [image, setImage] = useState();
  const [name, setName] = useState();

  const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
      });
  }

  const handleSave = () => {
    addDog({id: generateUUID(),
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
            <Typography variant={'h4'}>{"Add new dog"}</Typography>
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
            <Button variant={"contained"} onClick={handleSave} fullWidth>Save</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default NewDog;