import React, { useState, useEffect, Fragment } from "react";

import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import { Box, Divider, Drawer, IconButton, List, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";


const ReservationsComponent = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");
      const [anchorEl, setAnchorEl] = useState(null);
      const [selectedRow, setSelectedRow] = useState(null);
      const openMenu = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
      };
    
      const closeMenu = () => {
        setAnchorEl(null);
        setSelectedRow(null);
      };



  const DEFAULT_ERROR_MESSAGE = "Failed to fetch reservations.";
  // Fetch reservations data
  const fetchReservations = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/reservation/room`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setReservationsData(data.reservations || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => {
          setErrorMsg(error?.message || DEFAULT_ERROR_MESSAGE);
          toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
        },
        withToast: false,
      });
    } catch (error) {
      setErrorMsg(DEFAULT_ERROR_MESSAGE);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handlePageChange = (page) => {
    fetchReservations(page);
  };

  const handleViewRooms = (rooms) => {
    setSelectedRooms(rooms);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const rows = reservationsData.map((reservation) => ({
    ...reservation,
    id: reservation.id,
    user_id: reservation.user_id,
    name: reservation.user.name,
    email: reservation.user.email,
    registration_type: reservation.user.registration_type,
    room_count: reservation.room_count,
    companions_count: reservation.companions_count,
    update_deadline: reservation.update_deadline,
    created_at: reservation.created_at,
    rooms: reservation.rooms,
    actions: reservation.actions,
  }));
  const columns=[
    { field: "name",
       headerName: "Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell"
     },
    { field: "email",
       headerName: "Email",
       flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell" },
    { field: "registration_type",
       headerName: "Registration Type",
       flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell" },
    { field: "room_count",
       headerName: "Room Count",
        flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell" },
    { field: "companions_count",
       headerName: "Companions Count",
        flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell" },
    { field: "update_deadline", headerName: "Update Deadline", flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell" },
    { field: "created_at", headerName: "Created At", flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell" },
    { field: "actions", headerName: "Actions", flex: 1,
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
            <MenuItem onClick={() => {
              handleViewRooms(params.row.rooms);
              
            }}>
              View Rooms
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ]


  return (
    <div
    style={{
      borderRadius: '8px',
      width: '100%',
      maxWidth: '1700px',
      // height: 'calc(100vh - 80px)',
      padding: '20px',
    }}
    >

      <div className="reservations-component">
      <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              All Reservations
            </Typography>
        <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.email}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7]}
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

      

        <Drawer 
        open={isDrawerOpen} onClose={() => setDrawerOpen(false)}
          anchor="right"
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 1, 
    
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
          >
                <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: 2,
                    }}
                    >
                      <IconButton onClick={() => setDrawerOpen(false)}>
                       <CloseRounded /> 
                      </IconButton>
                    </div>
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
      
        gutterBottom
      >
                  Room Details

      </Typography>

                    <Box sx={{ padding: 2, overflowY: "auto" }}>
                   
        
        {selectedRooms.length > 0 ? (
          <List>
            {selectedRooms.map((room, index) => (
              <Box key={room.id} sx={{ marginBottom: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" ,          color: "#c62828",
 }} >
                  Room {index + 1}
                </Typography>
                <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                  <SimpleLabelValue label="Room Type" value={room.room_type || "-"} />
                  <SimpleLabelValue label="Occupant Name" value={room.occupant_name || "-"} />
                  <SimpleLabelValue label="Check-In" value={room.check_in_date || "-"} />
                  <SimpleLabelValue label="Check-Out" value={room.check_out_date || "-"} />
                  <SimpleLabelValue label="Total Nights" value={room.total_nights || "-"} />
                </Box>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" ,          color: "#c62828",}}>
                  Invoices
                </Typography>
                {room.reservation_invoices &&
                room.reservation_invoices.length > 0 ? (
                  room.reservation_invoices.map((invoice, invoiceIndex) => (
                    <Box
                      key={invoiceIndex}
                      sx={{
                        padding: 2,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        marginBottom: 2,
                      }}
                    >
                      <SimpleLabelValue label="Invoice ID" value={invoice.id || "-"} />
                      <SimpleLabelValue label="Base Price" value={invoice.price || "-"} />
                      <SimpleLabelValue
                        label="Additional Price"
                        value={invoice.additional_price || "-"}
                      />
                      <SimpleLabelValue label="Total Price" value={invoice.total || "-"} />
                      <SimpleLabelValue label="Status" value={invoice.status || "-"} />
                      <SimpleLabelValue
                        label="Confirmation PDF"
                        value={
                          invoice.confirmationPDF ? (
                            <a
                              href={invoice.confirmationPDF}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View PDF
                            </a>
                          ) : (
                            "-"
                          )
                        }
                      />
                    </Box>
                  ))
                ) : (
                  <Typography>No invoices available for this room.</Typography>
                )}
              </Box>
            ))}
          </List>
        ) : (
          <Typography>No rooms available for this reservation.</Typography>
        )}
      </Box>
        </Drawer>

     
      </div>
    </div>
  );
};

export default ReservationsComponent;
