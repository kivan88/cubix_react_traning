import * as React from 'react';
import { Container, Grid, Typography } from '@mui/material';

export default function Page404() {
  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={'h1'}>{"404"}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}