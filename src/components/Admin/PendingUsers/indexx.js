
import React, { useState, useEffect, useCallback, Fragment } from "react";
import Table from "../../../CoreComponent/Table";
import httpService from "../../../common/httpService";
import Select from "../../../CoreComponent/Select";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Pagination from "../../../CoreComponent/Pagination";
import DialogMessage from "../../DialogMessage";
import toast from "react-hot-toast";
import MySideDrawer from "../../../CoreComponent/SideDrawer";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import SimpleLabelValue from "../../SimpleLabelValue";
import { backendUrlImages } from "../../../constant/config";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


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
        //   actions: (
        //     <div className="actions-buttons-list">
        //       <button
        //         className="view-btn"
        //         onClick={() => {
        //           setSelectedUser(user);
        //           setIsDrawerOpen(true);
        //         }}
        //       >
        //         View
        //       </button>
        //       <button
        //         className={`view-btn ${
        //           user?.status !== "pending" && "disabled-btn"
        //         } `}
        //         onClick={() => {
        //           if (user?.registration_type === "speaker") {
        //             navigate(
        //               `/edit/speaker/data/${user.conferences?.[0]?.id}/${user.id}`
        //             );
        //           } else if (user?.registration_type === "attendance") {
        //             navigate(
        //               `/edit/attendance/data/${user.conference_id}/${user.id}`
        //             );
        //           } else if (user?.registration_type === "sponsor") {
        //             const sponsor = {
        //               user_id: user?.id,
        //               conference_id: user?.conference_id,
        //               company_name: user?.company_name,
        //               contact_person: user?.contact_person,
        //               company_address: user?.company_address,
        //               registration_type: user?.registration_type,
        //             };
        //             setSponsorData(sponsor);
        //             setIsDialogOpen(true);
        //           } else if (user?.registration_type === "group_registration") {
        //             navigate(`/group/update/admin/${user.id}`);
        //           } else if (!user?.registration_type) {
        //             navigate(`/adminForm/${user.id}`);
        //           }
        //         }}
        //         disabled={user?.status !== "pending"}
        //       >
        //         Submit
        //       </button>
        //       <button className="actions-buttons-list" onClick={()=>handleDelete(user.id)}>Delete</button>
        //     </div>
        //   ),
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
      flex: 0.45,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
        field: "whatsapp_number",
        headerName:  "WhatsApp Number",
        flex: 0.45,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      {
        field: "specialization",
        headerName:  "Specialization",
        flex: 0.45,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      {
        field: "country_of_residence",
        headerName:  "Country of Residence",
        flex: 0.45,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
    {
      field: "registration_type",
      headerName: "Registration Type",
      flex: 0.5,
      minWidth: 150,
      cellClassName: "centered-cell",
      
      
    },
    {
        field: "registration_type",
      headerName: "Registration Type",
      flex: 0.5,
      minWidth: 150,
      cellClassName: "centered-cell",

    },{
        field: "status",
        headerName: "Status",
        flex: 0.5,
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
                    params?.status !== "pending" && "disabled-btn"
                  } `}
                  onClick={() => {
                    if (params?.registration_type === "speaker") {
                      navigate(
                        `/edit/speaker/data/${params.conferences?.[0]?.id}/${params.id}`
                      );
                    } else if (params?.registration_type === "attendance") {
                      navigate(
                        `/edit/attendance/data/${params.conference_id}/${params.id}`
                      );
                    } else if (params?.registration_type === "sponsor") {
                      const sponsor = {
                        user_id: params?.id,
                        conference_id: params?.conference_id,
                        company_name: params?.company_name,
                        contact_person: params?.contact_person,
                        company_address: params?.company_address,
                        registration_type:params?.registration_type,
                      };
                      setSponsorData(sponsor);
                      setIsDialogOpen(true);
                    } else if (params?.registration_type === "group_registration") {
                      navigate(`/group/update/admin/${params.id}`);
                    } else if (!params?.registration_type) {
                      navigate(`/adminForm/${params.id}`);
                    }
                  }}
                  disabled={params?.status !== "pending"}
            >
                                Submit

            </MenuItem>
            <MenuItem onClick={() => {
              handleDelete(params.id)

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
      <h2>All Users</h2>
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
            getRowHeight={() => "auto"}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            getRowId={(row) => row.id}
            checkboxSelection
            disableRowSelectionOnClick
          
          />

     
      <MySideDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
        <CustomFormWrapper
          title="User Details"
          handleSubmit={() => setIsDrawerOpen(false)}
          setOpenForm={setIsDrawerOpen}
          noActions={true}
        >
          {selectedUser && (
            <div className="users-details">
              <SimpleLabelValue label="Name" value={selectedUser.name || "-"} />
              <SimpleLabelValue
                label="Email"
                value={selectedUser.email || "-"}
              />
              <SimpleLabelValue
                label="Phone Number"
                value={selectedUser.phone_number || "-"}
              />
              <SimpleLabelValue
                label="WhatsApp Number"
                value={selectedUser.whatsapp_number || "-"}
              />
              <SimpleLabelValue
                label="Nationality"
                value={selectedUser.nationality || "-"}
              />
              <SimpleLabelValue
                label="Country of Residence"
                value={selectedUser.country_of_residence || "-"}
              />
              <SimpleLabelValue
                label="Status"
                value={selectedUser.status || "-"}
              />
              <SimpleLabelValue
                label="Registration Type"
                value={selectedUser.registration_type || "-"}
              />
              <SimpleLabelValue
                label="Biography"
                value={selectedUser.biography || "-"}
              />
              <SimpleLabelValue
                label="Company Name"
                value={selectedUser.company_name || "-"}
              />
              <SimpleLabelValue
                label="Contact Person"
                value={selectedUser.contact_person || "-"}
              />
              <SimpleLabelValue
                label="Company Address"
                value={selectedUser.company_address || "-"}
              />
              <SimpleLabelValue
                label="Conferences"
                value={
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
              {selectedUser.papers?.length
                ? selectedUser.papers.map((paper, index) => (
                    <Fragment key={index}>
                      <SimpleLabelValue
                        label="Paper Title"
                        value={paper.title}
                      />
                      <SimpleLabelValue
                        label="Abstract"
                        value={
                          <img
                            src={`${backendUrlImages}${paper.file_path}`}
                            className="conference-thumbnail"
                          />
                          // <ImageUpload
                          //   required
                          //   label="Abstract"
                          //   allowedExtensions={["txt", "pdf", "doc", "docx"]}
                          //   // inputValue={formFiles.abstract}
                          //   existingFile={paper.abstract}
                          //   // setInputValue={handleFileChange("abstract")}
                          //   className="image-upload"
                          //   placeholder="Abstract"
                          // />
                        }
                      />
                      <SimpleLabelValue
                        label="Paper Status"
                        value={paper.status}
                      />
                    </Fragment>
                  ))
                : "-"}
            </div>
          )}
        </CustomFormWrapper>
      </MySideDrawer>
    </div>
  );
};

export default PendingUsersTable;
