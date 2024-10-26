import {Button, TextField, Paper, Grid, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { useState } from 'react';
import '../App.css';

function MyForm(){
    const [name, setName] = useState('');
    const [takenBy, setTakenBy] = useState('');
    const [subject, setSubject] = useState('');

    return (
        <Paper className="custom-padding">  
            <Grid container spacing={2}>   
                <Grid item xs={12} md={6}>    
                    <TextField 
                        label="Equipment" 
                        variant="outlined" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>    
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Taken by</InputLabel>
                        <Select 
                            labelId="demo-simple-select-label" 
                            value= {takenBy} 
                            label="Taken by" 
                            onChange={e => setTakenBy(e.target.value)}>
                            <MenuItem value={1}>Joe</MenuItem>
                            <MenuItem value={2}>Mark</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}> 
                <TextField 
                        label="Subject" 
                        variant="outlined" 
                        value={subject} 
                        onChange={e => setSubject(e.target.value)}
                        fullWidth/>
                </Grid>
                <Grid item xs={12}> 
                    <Grid container spacing={2}>      
                        <Grid item xs={12} md={6}>
                            <Button color={"info"} variant={"contained"} fullWidth>ADD NEW IMAGE</Button> 
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button color={"error"} variant={"contained"} fullWidth>CANCEL</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default MyForm;