import React, { useState, useEffect, Fragment } from "react";

import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import { Box, Container, Drawer, Grid, IconButton, Paper, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";

const AirportTransferBookingsComponent = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
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



  const DEFAULT_ERROR_MESSAGE = "Failed to fetch bookings.";

  // Fetch bookings data
  const fetchBookings = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/airport-transfer-bookings/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setBookingsData(data.bookings || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => {
          setErrorMsg(error?.message || DEFAULT_ERROR_MESSAGE);
          toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
        },
        withToast: true,
      });
    } catch (error) {
      setErrorMsg(DEFAULT_ERROR_MESSAGE);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const handlePageChange = (page) => {
    fetchBookings(page);
  };

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const row = bookingsData.map((booking) => ({
    ...booking,
    id: booking.id,
    name: booking.user?.name,
    trip_type: booking.trip_type,
    arrival_date: new Date(booking.arrival_date).toLocaleString(),
    departure_date: new Date(booking.departure_date).toLocaleString(),
    flight_number: booking.flight_number,
    companion_name: booking.companion_name,
    actions: booking.actions,
  }));
  const column= [
    { field: "name", headerName: "Name", flex: 1, minWidth: 230,
      cellClassName: "centered-cell",

     },
    { field: "trip_type", headerName: "Trip Type", flex: 1, minWidth: 230,
      cellClassName: "centered-cell",

     },
    { field: "arrival_date", headerName: "Arrival Date", flex: 1, minWidth: 230 ,
      cellClassName: "centered-cell",

    },
    { field: "departure_date", headerName: "Departure Date", flex: 1, minWidth: 230,
      cellClassName: "centered-cell",

     },
    { field: "flight_number", headerName: "Flight Number", flex: 1, minWidth: 230,
      cellClassName: "centered-cell",

     },
    { field: "companion_name", headerName: "Companion Name", flex: 1, minWidth: 230,
      cellClassName: "centered-cell",

     },
    { field: "actions", headerName: "Actions", flex: 1, minWidth: 230,
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
              handleViewBookingDetails(params.row);
            }}>
              View Details
            </MenuItem>
          </Menu>
        </>
      ),
     },
  ];

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
        <Typography
                      variant="h6"
                      sx={{
                        color: '#c62828',
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        textAlign: 'center',
                      }}
                    >
                      All Airports
                    </Typography>
                    <DataGrid
        getRowId={(row) => row.id}
        rows={row}
                    columns={column}
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
          
    
       

        <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}
        anchor="right"
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1, 
  
          '& .MuiDrawer-paper': {
              zIndex: (theme) => theme.zIndex.modal + 1,
  
  
        width: 
        {
          xs: '100%',
          sm: '70%',
          md: '70%',
          lg: '50%',
          xl: '50%',
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

                    <Box
      sx={{
        margin: "0 auto",
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#c62828",
          backgroundColor: "#f1f1f1",
          textAlign: "center",
          padding: 1,
          borderRadius: 1,
          marginBottom: 3,
        }}
      >
        Booking Details
      </Typography>

      {selectedBooking ? (
        <Paper elevation={1} sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Trip Type:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.trip_type || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Arrival Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {new Date(selectedBooking.arrival_date).toLocaleString() || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Arrival Time:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.arrival_time || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Departure Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {new Date(selectedBooking.departure_date).toLocaleString() || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Departure Time:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.departure_time || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Flight Number:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.flight_number || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Companion Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.companion_name || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                User Email:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.user?.email || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                User Phone:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.user?.phone_number || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Conference Title:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {selectedBooking.conference?.title || "-"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#757575",
            marginTop: 2,
          }}
        >
          No booking details available.
        </Typography>
      )}
    </Box>
        </Drawer>

      
      </div>
  );
};

export default AirportTransferBookingsComponent;
