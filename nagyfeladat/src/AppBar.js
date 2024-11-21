import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography} from '@mui/material';

export default function ButtonAppBar() {
  return (<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello username!
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Logout</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}