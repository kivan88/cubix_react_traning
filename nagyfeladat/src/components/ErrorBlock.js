import { Container, Typography } from '@mui/material';

export default function ErrorBlock({error}) {
    return (<Container maxWidth={'xl'}>
        <Typography variant={"h3"} padding={2}>{'Error'}</Typography>
        <Typography variant={"body1"} padding={2}>{error}</Typography>
    </Container>)
} 