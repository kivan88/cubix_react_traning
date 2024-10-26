import './App.css';
import MyTable from "./components/MyTable";
import MyCard from './components/MyCard';
import {Container, Grid} from "@mui/material";
import MyForm from './components/MyForm';

function App() {
  return (
    <Container maxWidth={"lg"} style={{ backgroundColor: "#f0f0f0", padding: "16px", height: "100vh"}}>
      <Grid container spacing={2}>   
        <Grid item xs={12} md={8}>   
          <Grid container spacing={2}> 
            <Grid item xs={12}>   
              <MyTable/>
            </Grid>
            <Grid item xs={12}>   
              <MyForm/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}> 
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={12}>
              <MyCard cardText={"Interesting photo 1"} cardImage={"https://picsum.photos/200"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={12}>
              <MyCard cardText={"Interesting photo 2"} cardImage={"https://picsum.photos/300"}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;