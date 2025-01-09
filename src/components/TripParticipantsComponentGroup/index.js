import React, { useState, useEffect, Fragment } from "react";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import "./style.scss";
import moment from "moment";
import { Box, Drawer, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";

const TripParticipantsComponentGroup = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
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
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");


  const DEFAULT_ERROR_MESSAGE = "Failed to fetch participants.";

  // Fetch participants data
  const fetchParticipants = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/trip-participants/group/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setParticipantsData(data.participants || []);
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
  const formatValue = (value, type) =>
    type === "date"
      ? moment(value).format("DD-MM-YYYY")
      : value || "-";

  const handleViewDetails = (participant) => {
    setSelectedParticipant(participant);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const row = participantsData.map((participant) => ({
    trip_name: participant.trip_name,
    trip_type: participant.trip_type,
    id: participant.id,
    trip_id: participant.trip_id,
    user_name: participant.user_name,
    user_email: participant.user_email,
    selected_date: participant.selected_date,
    companions_count: participant.companions_count,
    total_price: participant.total_price,
    created_at: moment(participant.created_at).format("DD-MM-YYYY HH:MM"),
    updated_at: participant.updated_at,
    actions: participant.actions,
  }));
  const columns=[
    { field: "trip_name", headerName: "Trip Name", flex: 1, minWidth: 200 , cellClassName: "centered-cell", },
    { field: "trip_type", headerName: "Trip Type", flex: 1, minWidth: 200 , cellClassName: "centered-cell" },
    { field: "user_name", headerName: "User Name", flex: 1, minWidth: 200 , cellClassName: "centered-cell"},
    { field: "user_email", headerName: "User Email", flex: 1, minWidth: 200 , cellClassName: "centered-cell"},
    { field: "selected_date", headerName: "Selected Date", flex: 1, minWidth: 200 , cellClassName: "centered-cell" },
    { field: "companions_count", headerName: "Companions Count", flex: 1, minWidth: 200 , cellClassName: "centered-cell"},
    { field: "total_price", headerName: "Total Price", flex: 1, minWidth: 200 , cellClassName: "centered-cell" },
    { field: "created_at", headerName: "Created At", flex: 1, minWidth: 200 , cellClassName: "centered-cell"},
    { field: "actions", headerName: "Actions", flex: 1, minWidth: 200 , cellClassName: "centered-cell",
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
            handleViewDetails(params.row);

          }}>
            View Details
          </MenuItem>
        </Menu>
      </>
        

      )

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
        <Typography
                      variant="h6"
                      sx={{
                        color: '#c62828',
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        textAlign: 'center',
                      }}
                    >
                      Group Trip Participants
                    </Typography>
                    <DataGrid
        getRowId={(row) => row.id}
        rows={row}
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
                                            <Box className="participant-details" sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold",color:'#c62828' }}>
        Trip Details
      </Typography>
      {selectedParticipant ? (
        <Fragment>
          <Typography variant="h6" sx={{ mb: 1, color: "#555" }}>
            Participant Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Trip ID
              </Typography>
              <Typography variant="body1">{formatValue(selectedParticipant.trip_id)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Trip Name
              </Typography>
              <Typography variant="body1">{formatValue(selectedParticipant.trip_name)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Trip Type
              </Typography>
              <Typography variant="body1">{formatValue(selectedParticipant.trip_type)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Selected Date
              </Typography>
              <Typography variant="body1">
                {formatValue(selectedParticipant.selected_date, "date")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Companion Count
              </Typography>
              <Typography variant="body1">{formatValue(selectedParticipant.companions_count)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Total Price
              </Typography>
              <Typography variant="body1">
                ${formatValue(selectedParticipant.total_price)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" color="textSecondary">
                Created At
              </Typography>
              <Typography variant="body1">
                {formatValue(selectedParticipant.created_at, "date")}
              </Typography>
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No participant details available.
        </Typography>
      )}
    </Box>
        </Drawer>

      
      </div>
  );
};

export default TripParticipantsComponentGroup;
