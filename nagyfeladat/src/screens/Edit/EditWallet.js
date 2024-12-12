import { Container, Grid, Typography} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import '../../css/Wallet.css';
import MultipleSelectChip from './components/MultipleSelectChip';
import SubmitButton from '../../components/SubmitButton';
import { useNavigate, useParams } from 'react-router-dom';
import useApi, { AXIOS_METHOD, doApiCall } from '../../hooks/useApi';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';
import { useEffect, useState } from 'react';

function updateWalletShare(allUser, addedUser, removedUser, walletId, currentUserId) {
    const onSuccess = (data) => {
        console.log(data);
    }
    const onFailure = (error) => {
        console.log("error");
    }
    allUser.forEach((user) => {        
        if (addedUser.includes(user.name)) {
            return doApiCall(AXIOS_METHOD.POST, `/wallet/${walletId}/grant_access`, onSuccess, onFailure, {user_id: user.id});
        }
        if (removedUser.includes(user.name)) {
            if (user.id !== currentUserId) {
                return doApiCall(AXIOS_METHOD.POST, `/wallet/${walletId}/remove_access`, onSuccess, onFailure, {user_id: user.id});
            } 
        }
    });
}

export default function EditWallet() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [removedUsers, setRemovedUsers] = useState([]);
    const [addedUsers, setAddedUsers] = useState([]);
    const [wallet, loading, error] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
    const [usersData, loadingUsers, errorUsers] = useApi(AXIOS_METHOD.POST, '/user/list', {
        "prefix": ""
    });
    const [selectedUsers, setSelectedUsers] = useState([]); 

    useEffect(() => {
        if (loading === false && wallet !== false) {
            const initialUserNames = wallet?.access.map((user) => user.name);
            const addedUserNames = selectedUsers.filter(
                (name) => !initialUserNames.includes(name)
            );
            setAddedUsers(addedUserNames);
            const removedUserNames = initialUserNames.filter(
                (name) => !selectedUsers.includes(name)
            );
            setRemovedUsers(removedUserNames);
        }
    }, [loading, wallet, selectedUsers, setSelectedUsers]);

    if (loading === true  || loadingUsers === true) {
        return <LoadingBlock />;
    }

    if ((loading === false || loadingUsers === false) && error !== false) {
        return <ErrorBlock error={error}/>;
    }

    if ((loading === false || loadingUsers === false) && errorUsers !== false) {
        return <ErrorBlock error={errorUsers}/>;
    }

    const handleSelectedUsersChange = (values) => {
        setSelectedUsers(values);
    };

    return (<Container maxWidth={'xl'}>
        <Typography variant={"h3"} padding={2}>{`${wallet?.name} - edit`}</Typography>
        <Typography variant={"body1"} padding={2}>{`Owner: ${wallet?.created_by?.name}`}</Typography>
        <Grid container spacing={2} padding={2} className='EditWallet'>
            <Grid item xs={12}>
                <Formik initialValues={{description: wallet?.description}} validate={""} onSubmit={(values, formik)=>{
                        formik.setSubmitting(true);
                        updateWalletShare(usersData?.users, addedUsers, removedUsers, wallet?.id, wallet?.created_by?.id);
                        doApiCall(AXIOS_METHOD.PATCH, `/wallet/${wallet?.id}`, (_unusedResponseData)=>{
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
                                <Field name="description" type="text" required validate={""} component={TextField} label={"Description"} variant="outlined" multiline minRows={5} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <MultipleSelectChip users={usersData?.users} selectedUsers={wallet?.access} onSelectionChange={handleSelectedUsersChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={SubmitButton} id="SubmitButton" label={"Save"}/>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    </Container>)
}