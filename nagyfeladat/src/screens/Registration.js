import { Button, Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import React from 'react';
import ButtonAppBar from '../components/AppBar';
import '../css/Wallet.css';
import SubmitButton from '../components/SubmitButton';

export default function Registration() {
    return (<Container maxWidth={'xl'}>
        <ButtonAppBar />
        <Typography variant={"h3"} align='center' padding={2}>{'Registration'}</Typography>
        <Grid container spacing={2} padding={2}>
            <Grid item xs={12} className="centerMyForm">
                <Formik initialValues={{username: "", password: "", passwordagain: "", legalCheckbox: false}} validate={""} onSubmit={(values, formik)=>{
                    formik.setSubmitting(true);
                    setTimeout(()=>{
                        console.log(values);
                        formik.setSubmitting(false);
                    }, 3000);
                }}>
                    <Form className="Login">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="username" type="text" required validate={""} component={TextField} label={"Username"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="password" type="password" required validate={""} component={TextField} label={"Password"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="passwordagain" type="password" required validate={""} component={TextField} label={"Password again"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={CheckboxWithLabel} type="checkbox" name="legalCheckbox" Label={{label: "Accept legal stuff"}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={SubmitButton} label={"Register"}/>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    </Container>)
}