import { useNavigate } from 'react-router-dom';
import DogCard from './DogCard';
import AddDogCard from './AddDogCard';
import { Container, Grid, Typography } from '@mui/material';
import {useDogContext} from './utils/data';

function AllDogs() {
  const navigate = useNavigate();
  const {dogs, deleteDog} = useDogContext();

  const onNavigateToDog = (id) => {
    navigate(`/dog/${id}`);
  }

  const onDeleteDog = (id) => {
    deleteDog(id);
  }
  
  return <Container maxWidth={'lg'}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant={'h2'}>All dogs</Typography>
    </Grid>
    {dogs.map(dog => {
      return (<DogCard 
        key={dog.id} 
        dog={dog}
        onNavigateToDog={onNavigateToDog}
        onDeleteDog={onDeleteDog}/>)
    })}
    <AddDogCard/>
  </Grid>
    </Container>
}

export default AllDogs;