import { Button, Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';

function FormStatus() {    
    const {errors,isValid} = useFormikContext();
    
    if (isValid) {
        return (<Typography variant={"body1"} color="success">{'Nem található hiba'}</Typography>);
    }

    return (<Typography variant={"body1"} color="error">{JSON.stringify(errors)}</Typography>);
}

function formValidate(values){
    const errors = {};
    if (values.password !== values.passwordagain) {
        errors.passwordagain = 'A két jelszó nem egyezik meg';
    }
    return errors;
}

function passwordValidate(value){
    if (value.length < 3) {
        return 'A jelszó legalább 5 karakter hosszú kell legyen';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/i.test(value)) {
        return 'A jelszónak kötelező tartalmaznia legalább egy kis és nagy betűt, valamint legalább egy számot';
    }
}

function validateUserName(value) {
    if (value.length < 3) {
        return 'A felhasználónév legalább 3 karakter hosszú kell legyen';
    }
    if (value.length > 20) {
        return 'A felhasználónév legfeljebb 20 karakter hosszú lehet';
    }
    if (!/^[a-zA-Z0-9]+$/i.test(value)) {
        return 'A felhasználónév csak kis és nagy betűket, valamint számokat tartalmazhat';
    }
};

function validateEmail(value) {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errorMessage = 'Érvénytelen e-mail cím';
    }
    return errorMessage;
};

export default function Screen1() {
    return (<Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Formik initialValues={{username: "", email: "", password: "", passwordagain: ""}} validate={formValidate} onSubmit={(values, formik)=>{
                    formik.setSubmitting(true);
                    setTimeout(()=>{
                        console.log(values);
                        formik.setSubmitting(false);
                    }, 3000);
                }}>
                    <Form>
                        <FormStatus/><br/>
                        <Field name="username" type="text" required validate={validateUserName} component={TextField} label={"Felhasználónév"} variant="filled"/><br/>
                        <Field name="email" type="email" required validate={validateEmail} component={TextField} label={"E-mail"} variant="filled"/><br/>
                        <Field name="password" type="password" required validate={passwordValidate} component={TextField} label={"Jelszó"} variant="filled"/><br/>
                        <Field name="passwordagain" type="password" required validate={passwordValidate} component={TextField} label={"Jelszó újra"} variant="filled"/><br/>
                        <Button type="submit" color="primary" variant={"contained"}>Regisztráció</Button>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    </Container>)
}