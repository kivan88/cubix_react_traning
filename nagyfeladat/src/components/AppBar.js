import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function ButtonAppBar({authToken}) {
  const navigate = useNavigate();

  return (<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {authToken!==false && (<>Hello username!</>)}
          </Typography>
          {authToken===false && (<>
            <Button color="inherit" onClick={()=>{
              navigate('/');
            }}>Login</Button>
          </>)}
          {authToken!==false && (<>
            <Button color="inherit" onClick={()=>{
              navigate('/');
            }}>Logout</Button>
            </>)}
          {authToken===false && (<>
            <Button color="inherit" onClick={()=>{
              navigate('/registration');
          }}>Register</Button>
        </>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}