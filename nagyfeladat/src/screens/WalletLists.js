import { Container, Grid, IconButton, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import '../css/Wallet.css';
import WalletBox from '../components/WalletBox';
import {AddBox} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import { AXIOS_METHOD, doApiCall2 } from '../hooks/useApi';
import {useAuth} from '../hooks/useAuth';

export default function Screen2() {
    const navigate = useNavigate();
    const {authToken, user} = useAuth();
    const [walletList, setWalletList] = useState([]);
    useEffect(() => {
        doApiCall2(AXIOS_METHOD.GET, '/wallets', (data)=>{
            setWalletList(data);
        }, (apiError)=>{
            console.log(apiError);
        });
    }, [authToken, setWalletList]);

    const myWallet = (wallet) => {
        if (user.name === wallet?.created_by?.name) {
            return true;
        }
        return false;
    };

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h4"} padding={2}>{'My wallets'}</Typography>
        <Grid container spacing={2} padding={2}>
            {walletList.map(wallet => {
                console.log(wallet);
                if (myWallet(wallet))
                return (<WalletBox key={wallet.id} shared={!myWallet(wallet)} {...wallet}/>);
            })}
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
            {walletList.map(wallet => {
                if (!myWallet(wallet))
                return (<WalletBox key={wallet.id} shared={!myWallet(wallet)} {...wallet}/>);
            })}
        </Grid>
    </Container>)
}