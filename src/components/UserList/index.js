import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import AddDiscountForm from "./discountForm";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [openDiscountForm, setOpenDiscountForm] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("all"); // Track status filter
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

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const getAuthToken = () => localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/users`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        params: { page: currentPage },
      });

      console.log({ response });

      setTotalPages(response.data.pagination.total_pages);
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);


  const rows = users
    .filter((item) => item?.registration_type == "speaker")
    ?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      registration_type: user.registration_type,
      action:user.actions, 

    }));
  const columns = [
      
      { field: "name", headerName: "Name", 
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
       },
      { field: "email", headerName: "Email",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
       },
      { field: "registration_type", headerName: "Registration Type",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },
      { field: "action", headerName: "Action", width: 180, 
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
                  setOpenDiscountForm(true);
                  setUserId(params.row.id);
                  
  
               }}>
                 view
              </MenuItem> 
             
            </Menu>
          </>
        ),
      },
    ];
  

  return (
    <div className="all-users-table">
      <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
              >
                Trips Users Discount
              </Typography>
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
   
      <AddDiscountForm
        isOpen={openDiscountForm}
        setIsOpen={setOpenDiscountForm}
        userId={userId}
      />
    </div>
  );
};

export default UsersList;
