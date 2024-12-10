import { Button, Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import '../css/Wallet.css';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';
import { useModals, MODALS } from '../hooks/useModals';

export default function Landing() {
    const navigate = useNavigate();
    const {handleLoginResult} = useAuth();
    const {showModal} = useModals();
    const handleRegistrationOnClick = () => {
        navigate('/registration');
    }
    const handleForgottenOnClick = () => {
        showModal(MODALS.MESSAGE, {message: 'Email would have been sent with new password if there were email address.', tilte: 'Email sent'});
    }

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h1"} align='center' padding={2}>{'Wallet'}</Typography>
        <Typography variant={"body2"} align='center'>{'The Wallet application is a digital platform that allows users to create and manage multiple wallets for organizing their finances. Users can securely store transaction records and track spending within each wallet. The app enables seamless sharing of wallets with other registered users, making it ideal for collaborative financial planning or group projects. With robust security features, it ensures the protection of sensitive financial data. Its intuitive interface and real-time updates make it a convenient tool for both personal and shared financial management.'}</Typography>
        <Grid container spacing={2} padding={2}>
            <Grid item xs={0} md={4}/>
            <Grid item xs={12} md={4}>
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
                    <Form>
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
            <Grid item xs={0} md={4}/>
            <Grid item xs={0} md={4}/>
            <Grid item xs={12} md={4} className="Login-forgotten">  
                <Button type="button" color="info" variant={"text"} onClick={handleForgottenOnClick}>Forgotten password</Button>
            </Grid>
            <Grid item xs={0} md={4}/>
            <Grid item xs={0} md={4}/>
            <Grid item xs={12} md={4}>  
                <Typography variant={"body2"}>{'Not yet registered:'}</Typography>
                <Button type="button" color="info" variant={"text"} onClick={handleRegistrationOnClick}>Register</Button>
            </Grid>
            <Grid item xs={0} md={4}/>
        </Grid>
    </Container>)
}