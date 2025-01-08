
import React, { useState, useEffect, useCallback, Fragment } from "react";
import httpService from "../../../common/httpService";
import Select from "../../../CoreComponent/Select";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import DialogMessage from "../../DialogMessage";
import toast from "react-hot-toast";

import { backendUrlImages } from "../../../constant/config";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";
import { Avatar, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { CloseRounded } from "@mui/icons-material";


const PendingUsersTable = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sponsorData, setSponsorData] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const openMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "all", label: "All" },
  ];
     
  const handleDelete = (userId) => {
    const token = localStorage.getItem("token"); // ضع التوكن الخاص بك هنا

    axios.delete(`${BaseUrl}/delete/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}` // تمرير التوكن هنا
        }
    })
    .then(response => {
        console.log("User deleted successfully:", response.data);

    })
    .catch(error => {
        console.error("Error deleting user:", error.response ? error.response.data : error.message);
    });
};

  const getAuthToken = () => localStorage.getItem("token");

  const fetchPendingUsers = useCallback(async () => {
    const url = `${BaseUrl}/users?status=${
      status?.value || "all"
    }&page=${currentPage}`;

    try {
      const response = await httpService({
        method: "GET",
        url,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
      });


   
    



      const usersWithActions = response?.data?.map((user) => {
        return {
          ...user,
          name: user?.name || user?.company_name,
        
        };
      });

      setPendingUsers(usersWithActions);
      setTotalPages(response.pagination?.total_pages);
      setCurrentPage(response.pagination?.current_page);
    } catch (err) {
      toast.error("Failed to fetch users.");
    }
  }, [status, currentPage, navigate]);

  useEffect(() => {
    fetchPendingUsers();
  }, [fetchPendingUsers]);

  const columns = [
    {
      field: "name",
      headerName:  "Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "email",
      headerName:  "Email",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      
    },
    {
      field: "phone_number",
      headerName:  "Phone Number",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
        field: "whatsapp_number",
        headerName:  "WhatsApp Number",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      {
        field: "specialization",
        headerName:  "Specialization",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      {
        field: "country_of_residence",
        headerName:  "Country of Residence",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
    {
      field: "registration_type",
      headerName: "Registration Type",
      flex: 1,
      minWidth: 150,
      cellClassName: "centered-cell",
      
      
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 150,
        cellClassName: "centered-cell",

    }
  
        ,

    {
      field: "actions",
      headerName:  "Actions",
      flex: 0.2,
      minWidth: 90,
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
             <MenuItem onClick={() => {
                setSelectedUser(params.row);
                setIsDrawerOpen(true)

             }}>
               view
            </MenuItem> 
            <MenuItem
                className={`view-btn ${
                    params.row?.status !== "pending" && "disabled-btn"
                  } `}
                  onClick={() => {
                    if (params.row?.registration_type === "speaker") {
                      navigate(
                        `/edit/speaker/data/${params.row.conferences?.[0]?.id}/${params.row.id}`
                      );
                    } else if (params.row?.registration_type === "attendance") {
                      navigate(
                        `/edit/attendance/data/${params.row.conference_id}/${params.row.id}`
                      );
                    } else if (params.row?.registration_type === "sponsor") {
                      const sponsor = {
                        user_id: params.row?.id,
                        conference_id: params.row?.conference_id,
                        company_name: params.row?.company_name,
                        contact_person: params.row?.contact_person,
                        company_address: params.row?.company_address,
                        registration_type:params.row?.registration_type,
                      };
                      setSponsorData(sponsor);
                      setIsDialogOpen(true);
                    } else if (params.row?.registration_type === "group_registration") {
                      navigate(`/group/update/admin/${params.row.id}`);
                    } else if (!params.row?.registration_type) {
                      navigate(`/adminForm/${params.row.id}`);
                    }
                  }}
                  disabled={params.row?.status !== "pending"}
            >
                                Submit

            </MenuItem>
            <MenuItem onClick={() => {
              handleDelete(params.row.id)

             }}>
                Delete
            </MenuItem> 
          </Menu>
        </>
      ),
    },
  ];
  const rows = pendingUsers.map((row) => {
    return {
      id: row.id,
      name: row.name, 
      email: row.email, 
      phone_number: row.phone_number, 
      whatsapp_number: row.whatsapp_number, 
      specialization: row.specialization,
      country_of_residence: row.country_of_residence, 
      registration_type: row.registration_type, 
      status: row.status, 
      actions: row.actions, 
    };
  });

  

  const approveSponsor = async () => {
    try {
      await httpService({
        method: "POST",
        url: `${BaseUrl}/approve/sponsor`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        data: sponsorData,
        withToast: true,
      });
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="pending-users-container">
      <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              All Users
            </Typography>
      <DialogMessage
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        message="Are you sure you want to approve this user?"
        onOk={approveSponsor}
        onClose={() => setIsDialogOpen(false)}
      />
      <Select
        options={statusOptions}
        value={status}
        setValue={setStatus}
        label="Visa Status"
      />
     <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
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

     
     
      <Drawer anchor="right"
      
      sx={{
        //width
        zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements

        '& .MuiDrawer-paper': {
            zIndex: (theme) => theme.zIndex.modal + 1,


      width: 
      {
        xs: '100%',
        sm: '50%',
        md: '50%',
        lg: '40%',
        xl: '40%',
      }, 
    },

      }}
       open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
          <IconButton onClick={() => setIsDrawerOpen(false)}>
           <CloseRounded /> 
          </IconButton>
        </div>
      <Box sx={{
       padding: 2,
        
       }}>
        <Typography variant="h6" 
        sx={{
        
          color: '#c62828',
          backgroundColor:'#f1f1f1',

          textAlign: 'center',
        }}

        textAlign={"center"}
        gutterBottom>
          User Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {selectedUser ? (
          <Grid container spacing={2}>
          {/* Basic Details */}
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={selectedUser.name || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={selectedUser.email || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone Number" secondary={selectedUser.phone_number || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="WhatsApp Number" secondary={selectedUser.whatsapp_number || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nationality" secondary={selectedUser.nationality || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Country of Residence" secondary={selectedUser.country_of_residence || "-"} />
              </ListItem>
            </List>
          </Grid>
        
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemText primary="Status" secondary={selectedUser.status || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Registration Type" secondary={selectedUser.registration_type || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Biography" secondary={selectedUser.biography || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Company Name" secondary={selectedUser.company_name || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Contact Person" secondary={selectedUser.contact_person || "-"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Company Address" secondary={selectedUser.company_address || "-"} />
              </ListItem>
            </List>
          </Grid>
        
          {/* Conferences */}
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Conferences"
                  secondary={
                    selectedUser.conferences?.length
                      ? selectedUser.conferences
                          .map(
                            (conference) =>
                              `${conference.title} (Location: ${conference.location}, Status: ${conference.status})`
                          )
                          .join(", ")
                      : "-"
                  }
                />
              </ListItem>
            </List>
          </Grid>
        
          {/* Papers */}
          {selectedUser.papers?.length
            ? selectedUser.papers.map((paper, index) => (
                <Grid container key={index} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Paper Title" secondary={paper.title} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Abstract"
                          secondary={
                            <Avatar
                              src={`${backendUrlImages}${paper.file_path}`}
                              alt="Abstract"
                              variant="square"
                              sx={{ width: 100, height: 100 }}
                            />
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Paper Status" secondary={paper.status} />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              ))
            : null}
        </Grid>
        
        ) : (
          <Typography>No user selected.</Typography>
        )}
      </Box>
    </Drawer>
    </div>
  );
};

export default PendingUsersTable;
