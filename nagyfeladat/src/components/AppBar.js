import * as React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import HomeIcon from '@mui/icons-material/Home';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const {user, authToken, logout} = useAuth();
  const location = useLocation();

  console.log(location.pathname);

  return (<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {authToken!==false && (<>Hello {user.name}!</>)}
          </Typography>
          {authToken!==false && location.pathname!=="/me" && (<>
          <IconButton aria-label="Home" onClick={()=>{
              navigate('/me');
            }}>
            <HomeIcon fontSize="large"/>
          </IconButton>
          </>)}
          {authToken===false && location.pathname!=="/" && (<>
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
          {authToken===false && location.pathname!=="/registration" && (<>
            <Button color="inherit" onClick={()=>{
              navigate('/registration');
          }}>Register</Button>
        </>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}