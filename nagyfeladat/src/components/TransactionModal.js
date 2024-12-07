import {Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik, Field} from "formik";
import {TextField} from 'formik-mui'
import SubmitButton from "../components/SubmitButton";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";

export default function TransactionModal({onClose}) {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
            <br/>
            <Formik initialValues={{}} onSubmit={(value, {setFieldError, setSubmitting}) => {
                setSubmitting(true);
                doApiCall(AXIOS_METHOD.POST, '/transactions', () => {
                    setSubmitting(false);
                    onClose();
                }, (apiError) => {
                    setFieldError('title', apiError);
                    setSubmitting(false);
                }, value);
            }}>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field component={TextField} name="title" label="Description" type="text" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name="amount" label="Amount" type="number" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={SubmitButton} label={"Add transaction"}/>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </DialogContent>
    </Dialog>)
}