import { Container, Grid } from '@mui/material';

const NotFound = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <img src="/image/notfound.svg" alt="Not Found" style={{ width: '100%' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default NotFound;