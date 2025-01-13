import React from 'react';
import { Grid, TextField, Button, Container, Typography } from '@mui/material';
import forgotpasswordImg from "../../icons/forgotpassword.svg";


const ForgotPassword2 = () => {
    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" ,marginTop: '32px'}}>
              <Grid container sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    spacing={2}
                    >
                      

                      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <Typography variant="h4" sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: " #c62828",
                                  }} className="login-title">
                                        Reset Password

                                  </Typography>
                                </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit" 
                            sx={{
                              backgroundColor: " #c62828",
                              color: "#ffffff",
                              width: "100%",
                            }}
                        >
                            Reset Password
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <img
            style={{width: '100%', height: '100%'}}
             src={forgotpasswordImg} alt="login" className="login-img" />
          </Grid>
                    </Grid>
           
          
        </Container>
    );
};

export default ForgotPassword2;