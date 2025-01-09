import React from "react";
import SimpleLabelValue from "../../../components/SimpleLabelValue";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper"; 
import "./style.scss";
import { backendUrlImages } from "../../../constant/config";
import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
const ViewFormExhibitions = ({ isOpen, setIsOpen, exhibitionData }) => {
  return (
      <Drawer open={isOpen} anchor="right" onClose={() => setIsOpen(false)}
    
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1, 

        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: "100%", md: "30%" },
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
      >
               <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 2,
      }}
    >
      <IconButton             onClick={() => setIsOpen(false)}
      >
        <CloseRounded />
      </IconButton>
    </div>
    <Box
      
    >
      <Typography
        variant="h6"
        sx={{
          color: "#c62828",
          textAlign: "center",
          backgroundColor: "#f1f1f1",
          padding: 1,
          borderRadius: 1,
          marginBottom: 2,
        }}
      >
        Exhibition Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SimpleLabelValue label="Title" value={exhibitionData?.title || "-"} />
        </Grid>
        <Grid item xs={12}>
          <SimpleLabelValue
            label="Description"
            value={exhibitionData?.description || "-"}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleLabelValue
            label="Location"
            value={exhibitionData?.location || "-"}
          />
        </Grid>
        <Grid item xs={6}>
          <SimpleLabelValue
            label="Start Date"
            value={
              exhibitionData?.start_date
                ? new Date(exhibitionData?.start_date).toLocaleDateString()
                : "-"
            }
          />
        </Grid>
        <Grid item xs={6}>
          <SimpleLabelValue
            label="End Date"
            value={
              exhibitionData?.end_date
                ? new Date(exhibitionData?.end_date).toLocaleDateString()
                : "-"
            }
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleLabelValue label="Status" value={exhibitionData?.status || "-"} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Exhibition Image
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              marginTop: 2,
            }}
          >
            <img
              src={`${backendUrlImages}${exhibitionData?.image}`}
              alt={exhibitionData?.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              className="view-exhibition-image"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
      </Drawer>
  );
};

export default ViewFormExhibitions;
