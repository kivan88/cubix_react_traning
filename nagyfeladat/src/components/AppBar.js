import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const {user, authToken, logout} = useAuth();

  return (<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {authToken!==false && (<>Hello {user.name}!</>)}
          </Typography>
          {authToken===false && (<>
            <Button color="inherit" onClick={()=>{
              navigate('/');
            }}>Login</Button>
          </>)}
          {authToken!==false && (<>
            <Button color="inherit" onClick={()=>{
              logout();
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