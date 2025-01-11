import React from "react";
import Dialog from "../../CoreComponent/Dialog";
import doneIcon from "../../icons/doneIcon.svg";
import SVG from "react-inlinesvg";

import "./style.scss";
import { Button, Grid, Typography } from "@mui/material";

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
      <Dialog
        viewHeader={true}
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
         <Grid item xs={6}>
    <Button
      onClick={handleClose}
      sx={{
        cursor: "pointer",
        width: "100%",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        backgroundColor: "transparent",
        border: "1px solid #32cb00",
        borderRadius: "5px",
        textAlign: "center",
        transition: "background-color 0.3s, color 0.3s",
        "&:hover": {
          color: "#ffffff",
          backgroundColor: "#32cb00",
        },
        "&:active": {
          color: "#ffffff",
          backgroundColor: "#165a00",
        },
      }}
    >
      Close
    </Button>
  </Grid>
  <Grid item xs={6}>
    <Button
      onClick={handleOk}
      sx={{
        cursor: "pointer",
        width: "100%",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: "#32cb00",
        border: "none",
        borderRadius: "5px",
        textAlign: "center",
        transition: "background-color 0.3s, color 0.3s",
        "&:hover": {
          backgroundColor: "#71e54b",
        },
        "&:active": {
          backgroundColor: "#165a00",
        },
      }}
    >
      Ok
    </Button>
  </Grid>
          </Grid>
        
        


        
      </Dialog>
  );
};

export default DialogMessage;
