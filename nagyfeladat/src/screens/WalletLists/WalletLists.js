import { Container, Grid, IconButton, Typography} from '@mui/material';
// import '../../css/Wallet.css';
import WalletBox from './components/WalletBox';
import {AddBox} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import { doApiCall, AXIOS_METHOD } from '../../hooks/useApi';
import {useAuth} from '../../hooks/useAuth';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';
import { useModals, MODALS } from '../../hooks/useModals';
import useWallets from '../../hooks/useWallets';

export default function WalletList() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {showModal} = useModals();
    const [walletList, loading, error, resetWalletList] = useWallets();
    
    const onDelete = (id) => {
        showModal(MODALS.CONFIRM, {
            message: "Are you sure you want to delete this wallet and it's transactions?",
            onConfirm: () => {
                doApiCall(AXIOS_METHOD.DELETE, `/wallet/${id}`, (_unusedDeletedItem) => resetWalletList(), 
                (message) => {
                    showModal(MODALS.ERROR, {message});
                }, {id});
            }
        })
    }

    const onDeleteShared = (id) => {
        showModal(MODALS.CONFIRM, {
            message: "Are you sure to remove your access from this wallet?",
            onConfirm: () => {
                doApiCall(AXIOS_METHOD.POST, `/wallet/${id}/remove_access`, (_unusedDeletedItem) => resetWalletList(), 
                (message) => {
                    showModal(MODALS.ERROR, {message, Error: "Error"});
                }, {
                    user_id: user.id,
                });
            }
        })
    }

    if (loading === true) {
        return <LoadingBlock />;
    }
    if (loading === false && error !== false) {
        return <ErrorBlock error={error} />;
    }

    const myWallet = (wallet) => {
        if (user.name === wallet?.created_by?.name) {
            return true;
        }
        return false;
    };

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h4"} padding={2}>{'My wallets'}</Typography>
        <Grid container spacing={2} padding={2}>
            {loading === false && walletList && walletList.map(wallet => { if (myWallet(wallet)) {
                return (<WalletBox key={wallet.id} {...wallet} shared={!myWallet(wallet)} onDelete={() => onDelete(wallet?.id)}/>);
            } return null;
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
            {loading === false && walletList && walletList.map(wallet => { if (!myWallet(wallet)) {
                    return (<WalletBox key={wallet.id} shared={!myWallet(wallet)} {...wallet} onDelete={() => onDeleteShared(wallet?.id)}/>);
                } return null;
            })}
        </Grid>
    </Container>)
}