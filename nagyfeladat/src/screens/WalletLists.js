import { Container, Grid, IconButton, Typography} from '@mui/material';
import React from 'react';
import '../css/Wallet.css';
import WalletBox from '../components/WalletBox';
import {AddBox} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

export default function Screen2() {
    const navigate = useNavigate();

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h4"} padding={2}>{'My wallets'}</Typography>
        <Grid container spacing={2} padding={2}>
            <WalletBox shared={false}/>
            <WalletBox shared={false}/>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <IconButton aria-label="Add" onClick={()=>{
                        navigate('/me/wallet/new');
                    }}>
                  <AddBox sx={{ fontSize: 100 }} />
                </IconButton>
            </Grid>
        </Grid>
        <Typography variant={"h4"} padding={2}>{'Shared wallets'}</Typography>
        <Grid container spacing={2} padding={2}>
            <WalletBox shared={true}/>
            <WalletBox shared={true}/>
        </Grid>
    </Container>)
}