import { Button, Container, Grid, IconButton, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography} from '@mui/material';
import React from 'react';
import ButtonAppBar from '../components/AppBar';
import '../css/Wallet.css';
import {DeleteOutline} from '@mui/icons-material';

export default function WalletTransactions() {
    return (<Container maxWidth={'xl'}>
        <ButtonAppBar />
        <Typography variant={"h3"} padding={2}>{'Name - transactions'}</Typography>
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
                        <TableRow key={"row1"}>
                            <TableCell component="th" scope="row"> {"asd"} </TableCell>
                            <TableCell align="center">{"asd"}</TableCell>
                            <TableCell align="center">{"asd"}</TableCell>
                            <TableCell align="center">{"asd"}</TableCell>
                            <TableCell align="center">{"asd"}</TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="Delete">
                                    <DeleteOutline />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>  
                <Button type="button" color="info" variant={"contained"} fullWidth>Add transaction</Button>
            </Grid>
        </Grid>
    </Container>)
}