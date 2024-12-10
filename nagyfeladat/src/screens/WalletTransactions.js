import { Button, Container, Grid, IconButton, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography} from '@mui/material';
import React from 'react';
import '../css/Wallet.css';
import {DeleteOutline} from '@mui/icons-material';
import { useModals, MODALS } from '../hooks/useModals';
import useApi, { doApiCall, AXIOS_METHOD } from '../hooks/useApi';
import {useAuth} from '../hooks/useAuth';
import LoadingBlock from '../components/LoadingBlock';
import ErrorBlock from '../components/ErrorBlock';
import useTransactions from '../hooks/useTransactions';
import { useParams } from 'react-router-dom';

function formatDate(dateString) {
    return new Date(dateString).toUTCString();
}

export default function WalletTransactions() {
    const {user} = useAuth();
    const {showModal } = useModals();
    const {id} = useParams();
    const [transactions, loading, error, onLoadMore, hasMore, resetTransactions] = useTransactions(id,10);
    const [wallet, loading2, error2] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
    
    const onDelete = (id) => {
        showModal(MODALS.CONFIRM, {
            message: "Are you sure you want to delete this transaction?",
            onConfirm: () => {
                doApiCall(AXIOS_METHOD.DELETE, `/transaction/${id}`, (_unusedDeletedItem) => resetTransactions(), 
                (message) => {
                    showModal(MODALS.MESSAGE, {message, title: 'Error'});
                }, {id});
            }
        })
    }
    
    const onAdd = () => {
        showModal(MODALS.TRANSACTION, { id: id });
        resetTransactions();
    }

    if (loading === true || loading2 === true) {
        return <LoadingBlock />;
    }
    if (loading === false && (error !== false || error2 !== false)) {
        return <ErrorBlock error={error} />;
    }

    const myTransaction = (name) => {
        if (user.name === name) {
            return true;
        }
        return false;
    };

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h3"} padding={2}>{`${wallet.name} - transactions`}</Typography>
        <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Created By</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {loading === false && transactions && transactions.map(transaction => {
                            return (
                                <TableRow key={transaction?.id}>
                                    <TableCell component="th" scope="row"> {transaction?.id} </TableCell>
                                    <TableCell align="center">{transaction?.title}</TableCell>
                                    <TableCell align="center">{transaction?.amount}</TableCell>
                                    <TableCell align="center">{transaction?.created_by?.name}</TableCell>
                                    <TableCell align="center">{formatDate(transaction?.created_at)}</TableCell>
                                    <TableCell align="center">
                                        { myTransaction(transaction?.created_by?.name) && 
                                        <IconButton aria-label="Delete" onClick={() => onDelete(transaction?.id)}>
                                            <DeleteOutline />
                                        </IconButton>}
                                    </TableCell>
                                </TableRow>
                            )})}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                {hasMore && <Button onClick={onLoadMore} fullWidth>Load more</Button>}
            </Grid>
            <Grid item xs={12}>  
                <Button type="button" color="info" variant={"contained"} onClick={onAdd} fullWidth>Add transaction</Button>
            </Grid>
        </Grid>
    </Container>)
}