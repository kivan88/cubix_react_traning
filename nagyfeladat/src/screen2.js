import { Container, Grid, IconButton, Typography} from '@mui/material';
import React from 'react';
import ButtonAppBar from './AppBar';
import './Wallet.css';
import WalletBox from './components/WalletBox';
import {AddBox} from '@mui/icons-material';

export default function Screen2() {
    return (<Container maxWidth={'xl'}>
        <ButtonAppBar />
        <Typography variant={"h4"} padding={2}>{'My wallets'}</Typography>
        <Grid container spacing={2} padding={2}>
            <WalletBox/>
            <WalletBox/>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <IconButton aria-label="Add">
                  <AddBox sx={{ fontSize: 100 }} />
                </IconButton>
            </Grid>
        </Grid>
        <Typography variant={"h4"} padding={2}>{'Shared wallets'}</Typography>
        <Grid container spacing={2} padding={2}>
            <WalletBox/>
            <WalletBox/>
        </Grid>
    </Container>)
}