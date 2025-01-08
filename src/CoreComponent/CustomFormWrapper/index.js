import React from "react";
import "./style.scss";

const CustomFormWrapper = ({
  title,
  children,
  handleSubmit,
  setOpenForm,
  noActions = false,
}) => {
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
     
    }}>
      <div className="information-header">{title}</div>
      <div 
      style={{
        width:'100%',
        padding:'20px',
      }}
      >{children}</div>
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
