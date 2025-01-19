import React from "react";
import "./style.scss";
import { Typography } from "@mui/material";

const CustomFormWrapper = ({
  title,
  children,
  handleSubmit,
  setOpenForm,
  noActions = false,
}) => {
  return (
    <div
      style={{
        // display: "flex",
        // flexDirection: "column",
        // justifyContent:'start',
        // alignItems:'center',
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" color="#c62828" textAlign={"center"}>
        {title}
      </Typography>

      <div
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        {children}
      </div>
      {!noActions && (
        <div className="actions-section-container">
          <button
            className="submit-btn"
            type="submit"
            onClick={handleSubmit ? handleSubmit : null}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomFormWrapper;
