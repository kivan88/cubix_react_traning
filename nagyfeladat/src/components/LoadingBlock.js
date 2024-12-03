import { CircularProgress, Container } from '@mui/material';

export default function LoadingBlock() {
    return (<Container maxWidth={'xl'}>
                <CircularProgress />
            </Container>
    );
} 