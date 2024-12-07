import { Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import '../css/Wallet.css';
import MultipleSelectChip from '../components/MultipleSelectChip';
import SubmitButton from '../components/SubmitButton';
import { useNavigate, useParams } from 'react-router-dom';
import useApi, { AXIOS_METHOD, doApiCall } from '../hooks/useApi';
import LoadingBlock from '../components/LoadingBlock';
import ErrorBlock from '../components/ErrorBlock';

export default function EditWallet() {
    const navigate = useNavigate();
    const {id} = useParams();
        
    const [wallet, loading, error] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);

    const userData = {
        "prefix": "",
        "limit": 5,
        "cursor": ""
    };
    const [usersData, loadingUsers, errorUsers] = useApi(AXIOS_METHOD.POST, '/user/list', userData);

    if (loading === true) {
        return <LoadingBlock />;
    }
    if (loading === false && error !== false) {
        return <ErrorBlock error={error}/>;
    }

    if (loadingUsers === true) {
        return null;
    }
    if (errorUsers !== false) {
        return (<Container maxWidth={'xl'}>
            <Typography variant={"h3"} padding={2}>{'Error'}</Typography>
            <Typography variant={"body1"} padding={2}>{errorUsers}</Typography>
        </Container>)
    }

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h3"} padding={2}>{`${wallet?.name} - edit`}</Typography>
        <Typography variant={"body1"} padding={2}>{`Owner: ${wallet?.created_by?.name}`}</Typography>
        <Grid container spacing={2} padding={2} className='EditWallet'>
            <Grid item xs={12}>
                <Formik initialValues={{name: wallet?.name , description: wallet?.description}} validate={""} onSubmit={(values, formik)=>{
                    formik.setSubmitting(true);
                    doApiCall(AXIOS_METHOD.PUT, '/wallet', (_unusedNewWallet)=>{
                        formik.setSubmitting(false);
                        navigate('/me');
                    }, (apiError)=>{
                        formik.setFieldError('name', apiError);
                        formik.setSubmitting(false);
                    }, values);
                }} enableReinitialize={true}>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="name" type="text" required validate={""} component={TextField} label={"Name"} variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="description" type="text" required validate={""} component={TextField} label={"Description"} variant="outlined" multiline minRows={3} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <MultipleSelectChip name="sharedWith" users={usersData?.users} selectedUsers={wallet?.access} />
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