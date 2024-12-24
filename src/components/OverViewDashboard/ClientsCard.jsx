import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material"
import BusinessIcon from '@mui/icons-material/Business';


function ClientsCard() {
  return (
    
    <Card
    >
        <CardContent>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar>
                        <BusinessIcon />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography variant="h5">5k</Typography>
                    <Typography color="textSecondary">Clients</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default ClientsCard
