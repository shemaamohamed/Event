import { Container, Grid } from "@mui/material";
import PieActiveAr  from "./PieActiveAr"
import UsersCard from "./UsersCard";
import ClientsCard from "./ClientsCard";
import ServicesChart from "./ServicesChart";

const OverViewDashboard = () => {
  return (
    <Container
   
    >
      <Grid container spacing={3} 
       sx={{
        marginTop:'60px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
  
      }}
      >
         <Grid item xs={12} sm={6} md={5}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={12}>
              <UsersCard />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ClientsCard />
            </Grid>
           
            </Grid>
        
        </Grid>

       
        
        <Grid item xs={12} sm={12} md={6}
      >
        <PieActiveAr/>
        </Grid>
        <Grid item xs={12} sm={12} md={12}
      >
        <ServicesChart/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OverViewDashboard;
