import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const ActiveRegistrations = () => {
  const [registrationsData, setRegistrationsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState(null);

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch registrations data
  const fetchRegistrations = async (page = 1) => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/admin/all/excel`,
        params: { page },
        headers: { Authorization: `Bearer ${token}` },
        onSuccess: (data) => {
          setRegistrationsData(data.registrations || []);
          console.log(data.registrations);
        },
        onError: (error) => setErrorMsg(error?.message || "Failed to fetch registrations."),
        withToast: true,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch registrations.");
    }
  };



  const handleUploadClick = (registration) => {
    setFile(null); // Reset file before uploading
    setDialogOpen(true);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/admin/excel-upload`, // Adjust endpoint as needed
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        onSuccess: () => {
          toast.success("File uploaded successfully!");
          fetchRegistrations(); // Refresh the list after file upload
        },
        onError: (error) => console.error("Failed to upload file:", error),
      });
    } catch (error) {
      console.error("Failed to upload file:", error);
    }

    setDialogOpen(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);
    
  const columns = [
    {
      field: "user_name",
      headerName:  "User Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "contact_phone",
      headerName:  "Email",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      
    },

    {
      field: "organization_name",
      headerName:  "Organization",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
        field: "contact_person",
        headerName:  "ContactPerson",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      {
        field: "number_of_doctors",
        headerName:  "Number of Doctors",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      {
        field: "excel_file",
        headerName:  "Excel File",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
    {
      field: "update_deadline",
      headerName: "Update Deadline",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      
      
    },
    

   
  ];
  const rows = registrationsData.map((row) => {
    return {
      user_name: row.user_name,
     user_email: row.user_email,
    contact_phone: row.contact_phone,
    organization_name: row.organization_name,
    contact_person:row.contact_person,
    number_of_doctors: row.number_of_doctors,
    excel_file: row.excel_file? (
      <a
        href={`${BaseUrl}/${row.excel_file}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Excel
      </a>
    ) : (
      "No File"
    )
    ,
    update_deadline: row.update_deadline,
    };
  });

 

  return (
    <Fragment>
      <div className="registrations-component">
      <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              Group Registrations
            </Typography>
        
          <DataGrid
                   
                    getRowId={(row) => row.user_email} 
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 8,
                        },
                      },
                    }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    autoHeight
                    sx={{
                      marginTop: "20px",
                      "& .MuiDataGrid-virtualScroller": {
                        overflow: "hidden", // لإزالة أي تمرير غير مرغوب فيه
                      },
        }}
                   
                  />


        

        {isDialogOpen && (
          <Dialog
            viewHeader={true}
            header="Upload Excel File"
            open={isDialogOpen}
            setOpen={setDialogOpen}
            className="dialog-file"
          >
            <div className="dialog-content">
          
              <div className="dialog-actions">
                <button className="save-button" onClick={handleFileUpload}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog>
        )}

       
      </div>
    </Fragment>
  );
};

export default ActiveRegistrations;
