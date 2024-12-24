import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const UsersCard = () => {
    return (
     
        <Card
            
        >
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar>
                            <PeopleIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">20k</Typography>
                        <Typography color="textSecondary">Users</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UsersCard;