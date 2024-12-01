import { Button, Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import '../css/Wallet.css';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';

export default function Landing() {
    const navigate = useNavigate();
    const {handleLoginResult} = useAuth();

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h1"} align='center' padding={2}>{'Wallet'}</Typography>
        <Typography variant={"body2"} align='center'>{'The Wallet application is a digital platform that allows users to create and manage multiple wallets for organizing their finances. Users can securely store transaction records and track spending within each wallet. The app enables seamless sharing of wallets with other registered users, making it ideal for collaborative financial planning or group projects. With robust security features, it ensures the protection of sensitive financial data. Its intuitive interface and real-time updates make it a convenient tool for both personal and shared financial management.'}</Typography>
        <Grid container spacing={2} padding={2} className='Login'>
            <Grid item xs={12}>
                <Formik initialValues={{name: "", password: ""}} validate={""} onSubmit={(values, formik)=>{
                    formik.setSubmitting(true);
                    doApiCall(AXIOS_METHOD.POST, '/login', (data)=>{
                        handleLoginResult(data);
                        navigate('/me');
                    }, (apiError)=>{
                        formik.setFieldError('name', apiError);
                        formik.setSubmitting(false);
                    }, values);
                }}>
                    <Form className='Login'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="name" type="text" required validate={""} component={TextField} label={"Username"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="password" type="password" required validate={""} component={TextField} label={"Password"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" color="primary" variant={"contained"} 
                                fullWidth>Login</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
            <Grid item xs={12} className='Login-forgotten'>  
                <Button type="button" color="info" variant={"text"}>Forgotten password</Button>
            </Grid>
            <Grid item xs={12}>  
            <Typography variant={"body2"}>{'Not yet registered:'}</Typography>
            <Button type="button" color="info" variant={"text"}>Register</Button>
            </Grid>
        </Grid>
    </Container>)
}