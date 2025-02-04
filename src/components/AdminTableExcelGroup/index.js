import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { backendUrlImages } from "../../constant/config";

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
          setRegistrationsData(data.registrations.reverse() || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
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
      field: "user_email",
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
        renderCell: (params) => (
          <span>
            {params.value? (
              <a
              href={`${backendUrlImages}${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              View Excel
            </a>
            ) : (
              "No File" 
              
            )}
          </span>
        ),

      },
    {
      field: "update_deadline",
      headerName: "Update Deadline",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      
      
    },
    {
      field: "last_update",
      headerName: "Last Update By User",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => {
        // إذا كان هناك تاريخ موجود، نقوم بعرضه بدون الوقت
        const date = params.value ? new Date(params.value) : null;
        const formattedDate = date
          ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
          : "No Date";
        return <span>{formattedDate}</span>;
      }
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
    excel_file: row.excel_file,
    update_deadline: row.update_deadline,
    last_update: row.last_update,

    };
  });

 

  return (
      <div 
      style={{
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1700px',
        padding: '20px',
      }}
      >
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
                    paginationModel={{ page: currentPage - 1, pageSize: 12 }} 
                    onPaginationModelChange={(pagination) => {
                      setCurrentPage(pagination.page + 1); 
                      fetchRegistrations(pagination.page + 1);
                    }}
                    rowCount={totalPages * 12} 
                    pageSizeOptions={[12]}
                    paginationMode="server" 
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
  );
};

export default ActiveRegistrations;
