import { Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import React from 'react';
import '../css/Wallet.css';
import SubmitButton from '../components/SubmitButton';
import { AXIOS_METHOD, doApiCall } from '../hooks/useApi';
import {useNavigate} from 'react-router-dom';
// import {useAuth} from '../hooks/useAuth';
import { useModals, MODALS } from '../hooks/useModals';

export default function Registration() {
    const navigate = useNavigate();
    // const {handleLoginResult} = useAuth();
    const {showModal } = useModals();

    function validateRegFormValues(values) {
        const errors = {};
        if (values.password !== values.password2) {
            errors['password2'] = 'The two passwords are different!';
        }
        return errors;
    }

    function validateUsername(name) {
        const NAME_REGEX = /^[0-9a-zA-Z]*$/g;
        if (name.length < 3) {
            return 'Name should be at least 3 characters!';
        }
        if (NAME_REGEX.test(name) === false) {
            return 'Name can only include numbers, upper and lowercase characters!';
        }
    }

    function validatePassword(value){
        if (value.length < 5) {
            return 'The password must be at least 5 characters long!';
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/i.test(value)) {
            return 'The password must contain at least one uppercase and lowercase letter and at least one number!';
        }
    }

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h3"} align='center' padding={2}>{'Registration'}</Typography>
        <Grid container spacing={2} padding={2}>
            <Grid item xs={0} md={4}/>
            <Grid item xs={12} md={4}>
                <Formik initialValues={{name: "", password: "", password2: "", legalCheckbox: false}} validate={validateRegFormValues} onSubmit={(values, formik)=>{
                    formik.setSubmitting(true);
                    const onFailure = (apiError)=>{
                        formik.setFieldError('name', apiError);
                        formik.setSubmitting(false);
                    };

                    doApiCall(AXIOS_METHOD.POST, '/reg', (_unusedRegData)=>{
                        // doApiCall(AXIOS_METHOD.POST, '/login', (data)=>{
                        //     handleLoginResult(data);
                        //     formik.setSubmitting(false);
                        //     navigate('/me');
                        // }, onFailure, values);
                        showModal(MODALS.MESSAGE, {message: 'Registration successful!', tilte: 'Success'});
                        navigate('/');
                    }, onFailure, values);
                }}>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="name" type="text" required validate={validateUsername} component={TextField} label={"Username"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="password" type="password" required validate={validatePassword} component={TextField} label={"Password"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="password2" type="password" required component={TextField} label={"Password again"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={CheckboxWithLabel} type="checkbox" name="legalCheckbox" Label={{label: "Accept legal stuff"}} validate={value => value === false && 'Legal stuff accept required!'}/>
                                <Typography variant={"body2"} color={"error"}>
                                    <ErrorMessage name={"legalCheckbox"}/>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={SubmitButton} label={"Register"}/>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
            <Grid item xs={0} md={4}/>
        </Grid>
    </Container>)
}