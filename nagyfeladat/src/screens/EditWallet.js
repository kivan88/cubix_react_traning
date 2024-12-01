import { Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import '../css/Wallet.css';
import MultipleSelectChip from '../components/MultipleSelectChip';
import SubmitButton from '../components/SubmitButton';
import {useNavigate} from 'react-router-dom';
// import {useAuth} from '../hooks/useAuth';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';

export default function EditWallet() {
    const navigate = useNavigate();
    // const {user} = useAuth();

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h3"} padding={2}>{'Name - edit'}</Typography>
        <Typography variant={"body1"} padding={2}>{'Owner: user'}</Typography>
        <Grid container spacing={2} padding={2} className='EditWallet'>
            <Grid item xs={12}>
                <Formik initialValues={{name: "", description: "", sharedWith: [], createdby: ""}} validate={""} onSubmit={(values, formik)=>{
                    formik.setSubmitting(true);
                    doApiCall(AXIOS_METHOD.PUT, '/wallet', (_unusedNewWallet)=>{
                        formik.setSubmitting(false);
                        navigate('/me');
                    }, (apiError)=>{
                        formik.setFieldError('name', apiError);
                        formik.setSubmitting(false);
                    }, values);
                }}>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="name" type="text" required validate={""} component={TextField} label={"Name"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="description" type="text" required validate={""} component={TextField} label={"Description"} variant="outlined" multiline minRows={3} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <MultipleSelectChip name="sharedWith"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={SubmitButton} onClick={()=>{
                                    navigate(`/me`);
                                }} label={"Save"}/>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    </Container>)
}