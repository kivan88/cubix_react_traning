import {Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik, Field} from "formik";
import {TextField} from 'formik-mui'
import SubmitButton from "../components/SubmitButton";
import {AXIOS_METHOD, doApiCall} from "../hooks/useApi";

function validateTitle(title) {
    if (title.length < 3) {
        return 'Description should be at least 3 characters!';
    }
}

export default function TransactionModal({onClose, id}) {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
            <br/>
            <Formik initialValues={{title: "", amount: 0}} onSubmit={(value, {setFieldError, setSubmitting}) => {
                setSubmitting(true);
                doApiCall(AXIOS_METHOD.PUT, '/transactions', () => {
                    setSubmitting(false);
                    onClose();
                }, (apiError) => {
                    setFieldError('title', apiError);
                    setSubmitting(false);
                }, {
                    wallet_id: id,
                    title: value.title,
                    amount: value.amount
                });
            }}>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field component={TextField} name="title" label="Description" type="text" validate={validateTitle} required fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name="amount" label="Amount" type="number" required fullWidth/>
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