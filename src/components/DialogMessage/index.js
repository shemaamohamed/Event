import React from "react";
import Dialog from "../../CoreComponent/Dialog";
import doneIcon from "../../icons/doneIcon.svg";
import SVG from "react-inlinesvg";

import "./style.scss";
import { Grid, Typography } from "@mui/material";

const DialogMessage = ({ isDialogOpen, setIsDialogOpen, message, onOk, onClose }) => {
  const handleOk = () => {
    if (onOk) onOk();  
    setIsDialogOpen(false);  
  };

  const handleClose = () => {
    if (onClose) onClose();  
    setIsDialogOpen(false);  
  };

  return (
    <div className="dialog-message-container">
      <Dialog
        viewHeader={true}
        header=""
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      >
        <Grid container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={1}
        >
          <Grid item xs={12} >
          <SVG
              height={100}
              width={100}
              className="checkbox-icon"
              src={doneIcon}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}
        padding={2}
         >
          <Typography variant="h6"  textAlign="center">
          {message ||
              `Thank you for applying to speak at the conference. We will notify
            you by email once the admin approves your registration`}
          </Typography>
          </Grid>
          <Grid container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
          
          >
          <Grid item xs={6}
        
           >
          <button className="close" onClick={handleClose}>
              Close
            </button>
            


            </Grid>
            <Grid item xs={6}
          
           >
                      <button onClick={handleOk}>Ok</button>

            


            </Grid>
          </Grid>
        
        


        
      </Dialog>
    </div>
  );
};

export default DialogMessage;
