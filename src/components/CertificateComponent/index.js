import React, { useState, useEffect } from "react";
import Select from "../../CoreComponent/Select";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import { backendUrlImages } from "../../constant/config";
import { Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CertificateComponent = () => {
  // State variables to manage component state
  const [conferenceId, setConferenceId] = useState(null);
  const [registrationType, setRegistrationType] = useState("speaker");
  const [usersData, setUsersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [conferences, setConferences] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userIdForUpload, setUserIdForUpload] = useState(0);
  const [file, setFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);


  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  const registrationTypes = [
    { label: "Speaker", value: "speaker" },
    { label: "Attendance", value: "attendance" },
  ];
    const [isOpen, setIsOpen] = useState(false);
      const openMenu = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
      };
    
      const closeMenu = () => {
        setAnchorEl(null);
        setSelectedRow(null);
      };




  // Get upcoming conferences
  // const getConference = () => {
  //   const url = `${BaseUrl}/conferences/all`;
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setAllConference(
  //         response.data.data?.map((item) => ({
  //           label: item?.title,
  //           value: item?.id,
  //         }))
  //       );
  //     })
  //     .catch((error) => {
  //       toast.error("Error fetching conferences");
  //     });
  // };





















  // عند جلب البيانات من API
  const fetchConferences = async () => {
      try {
          const response = await httpService({
              method: "GET",
              url: `${BaseUrl}/conferences/all`,
              onSuccess: (data) => {
                  setConferences(data.data);  // تأكد من أنك تحفظ البيانات بشكل صحيح
              },
              onError: (error) =>
                  setErrorMsg(error?.message || "Failed to fetch conferences."),
          });
      } catch (error) {
          setErrorMsg("Failed to fetch conferences.");
      }
  };
  

  // Function to fetch users based on the selected conference and registration type
  const fetchUsers = async (conferenceId, registrationType, page = 1) => {
    // if (!conferenceId) {
    //   setErrorMsg("Please select a conference.");
    //   return;
    // }

    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/users/speaker-att/${conferenceId ? conferenceId : ""
          }/${registrationType ? registrationType : ""}`,
        params: { page },
        headers: { Authorization: `Bearer ${token}` },
        onSuccess: (data) => {
          setUsersData(data.users.reverse()|| []);
          setTotalPages(data.totalPages || 1);
          setCurrentPage(data.currentPage || 1);
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch users."),
        withToast: true,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch users.");
    }
  };

  const handleFilterChange = () => {
    if (conferenceId) {
      fetchUsers(conferenceId, registrationType, 1); // Fetch users for the selected filters
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(conferenceId, registrationType, page);
  };

  const handleUploadClick = (user) => {
    setUserIdForUpload(user.id);
    setDialogOpen(true);
  };

  const rows = usersData.map((user) => ({
    ...user,
    
  }));

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("certificatePDF", file);

    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/users/${userIdForUpload}/certificate`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        onSuccess: () => {
          toast.success("File uploaded successfully!");
          fetchUsers();
        },
        onError: (error) => console.error("Failed to upload file:", error),
      });
    } catch (error) {
      console.error("Failed to upload file:", error);
    }

    setDialogOpen(false);
  };

  useEffect(() => {
    fetchConferences();
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "registration_type",
      headerName: "Registration Type",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "certificatePDF",
      headerName: "Certificate PDF",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
       renderCell: (params) => (
        
                <span>
                  {params.row.certificatePDF ? (
          params.row.certificatePDF.includes("image") ? (
            <img
              src={`${backendUrlImages}${params.row.certificatePDF}`}
              alt="Certificate"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <a
              href={`${backendUrlImages}${params.row.certificatePDF}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View File
            </a>
          )
        ) : (
          "No Certificate"
        )}
                </span>
              ),

    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => openMenu(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRow?.id === params.row.id}
            onClose={closeMenu}
          >
            <MenuItem
              onClick={() => {
                handleUploadClick(params.row)
              }
            }
            >
              Upload Certificate
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <div className="certificate-component">
      {/* Filters Section */}
      <Grid container spacing={2} >
        <Grid item xs={12} md={6} >
        <Select
          label="Select Conference"
          options={conferences.map((item) => ({
            label: item.title,  // استخدم title كـ label
            value: item.id,     // استخدم id كـ value
          }))}
          value={conferences.find((item) => item.id === conferenceId)} // تأكد من أن القيمة تتطابق مع id
          setValue={(option) => {
            setConferenceId(option.value); // تعيين الـconferenceId
            fetchUsers(option.value, registrationType, 1); // جلب البيانات بناءً على المؤتمر المحدد
          }}
        />

        </Grid>
       

        <Grid item xs={12} md={6} >
        <Select
          label="Select Registration Type"
          options={registrationTypes}
          value={registrationTypes.find(
            (item) => item?.value === registrationType
          )}
          setValue={(option) => {
            setRegistrationType(option.value);
            fetchUsers(conferenceId, option.value, 1);
          }}
        //   errorMsg={errorMsg}
        />
          </Grid>
       
      </Grid>

      {/* Users Table Section */}
      <div className="table-container" style={{
        marginTop:'20px'
      }}>
        <DataGrid
                      rows={rows}
                      columns={columns}
                      getRowId={(row) => row.id}
        
                      getRowHeight={() => "auto"}
        
                      paginationModel={{ page: currentPage - 1, pageSize: 12 }} 
        onPaginationModelChange={(pagination) => {
          setCurrentPage(pagination.page + 1); 
          handlePageChange(pagination.page + 1);
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
      </div>

      {/* File Upload Dialog */}
      {isDialogOpen && (
        <Dialog
          viewHeader={true}
          header="Upload Certificate File"
          open={isDialogOpen}
          setOpen={setDialogOpen}
        >
          <div className="dialog-content-files">
            <div className="file-con">
              <ImageUpload
                required
                label="Certificate File"
                allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
                inputValue={file}
                setInputValue={setFile}
                className="image-upload"
                placeholder="Choose a file"
              />
            </div>

            <div className="buttons-file">
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

export default CertificateComponent;
