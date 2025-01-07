import React from "react";
import SimpleLabelValue from "../../../components/SimpleLabelValue";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper"; 
import "./style.scss";
import { backendUrlImages } from "../../../constant/config";
import { Drawer, IconButton, Typography } from "@mui/material";
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
    <Typography
        variant="h6"
        sx={{
          color: "#c62828",
          textAlign: "center",
          backgroundColor:'#f1f1f1'
        }}
        gutterBottom
      >
        Exhibition Details

      </Typography>
        
            <SimpleLabelValue label="Title" value={exhibitionData?.title} />
            <SimpleLabelValue
              label="Description"
              value={exhibitionData?.description}
            />
            <SimpleLabelValue
              label="Location"
              value={exhibitionData?.location}
            />
            <SimpleLabelValue
              label="Start Date"
              value={new Date(exhibitionData?.start_date).toLocaleDateString()}
            />
            <SimpleLabelValue
              label="End Date"
              value={new Date(exhibitionData?.end_date).toLocaleDateString()}
            />
            <SimpleLabelValue label="Status" value={exhibitionData?.status} />

            <SimpleLabelValue
              label="Exhibition Image"
              value={
                <img
                  src={`${backendUrlImages}${exhibitionData?.image}`}
                  alt={exhibitionData?.title}
                  className="view-exhibition-image"
                />
              }
            />
      </Drawer>
  );
};

export default ViewFormExhibitions;
