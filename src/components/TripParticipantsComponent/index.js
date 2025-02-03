import React, { useState, useEffect, Fragment } from "react";

import httpService from "../../common/httpService";
import "./style.scss";
import { Box, Drawer, Grid, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";


const TripParticipantsComponent = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [selectedParticipantDetails, setSelectedParticipantDetails] =
    useState(null);
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



  const fetchParticipants = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/trip-participants/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          const formattedParticipants = [];

          data.participants.forEach((entry) => {
            // Check if the main participant already exists in the formattedParticipants array
            const existingParticipant = formattedParticipants.find(
              (participant) =>
                participant.mainParticipant.id === entry.mainParticipant.id
            );

            if (existingParticipant) {
              // Merge companions into the existing participant object
              existingParticipant.companions = [
                ...existingParticipant.companions,
                ...entry.companions,
              ];
            } else {
              // Add the new main participant and their companions
              formattedParticipants.push({
                id: entry.mainParticipant.id,
                name: entry.mainParticipant.name,
                email: entry.mainParticipant.email,

                trip_name: entry.mainParticipant.trip_name,
                nationality: entry.mainParticipant.nationality,
                phone_number: entry.mainParticipant.phone_number,
                whatsapp_number: entry.mainParticipant.whatsapp_number,
                accommodation_stars: entry.mainParticipant.accommodation_stars,
                total_price: entry.mainParticipant.invoice.total_price,
                status: entry.mainParticipant.invoice.status,
                mainParticipant: entry.mainParticipant,
                companions: entry.companions,
              });
            }
          });

          setParticipantsData(formattedParticipants);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        withToast: false,
      });
    } catch (error) {
      // Handle error if necessary
    }
  };

  const handlePageChange = (page) => {
    fetchParticipants(page);
  };

  const handleViewDetails = (participant) => {
    setSelectedParticipantDetails(participant);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const rows = participantsData.map((participant) => ({
    ...participant,
    id: participant.id,
    name: participant.name,
    nationality: participant.nationality,
    phone_number: participant.phone_number,
    whatsapp_number: participant.whatsapp_number,
    accommodation_stars: participant.accommodation_stars,
    total_price: participant.total_price,
    status: participant.status,
    actions: participant.actions,
  }));
  const column = [
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
      field: "trip_name",
      headerName: "Trip Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "nationality",
      headerName: "Nationality",
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
      field: "whatsapp_number",
      headerName: "WhatsApp Number",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "accommodation_stars",
      headerName: "Accommodation Stars",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "total_price",
      headerName: "Total Price (USD)",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
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
            <MenuItem onClick={() => {
              handleViewDetails(params.row)

            }}>
              View Details
            </MenuItem>
          </Menu>
        </>


      )
    }



  ];


  return (
    <div

    >
      <div className="participants-component">
        <Typography
          variant="h6"
          sx={{
            color: '#c62828',
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            textAlign: 'center',
          }}
        >
          Private Trip Participants
        </Typography>
        <DataGrid
          getRowId={(row) => row.id}
          rows={rows}
          columns={column}
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
              maxWidth: 800,
              margin: "0 auto",
              padding: 3,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              overflowY: "auto"
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#c62828",
                textAlign: "center",
                marginBottom: 3,
                fontWeight: "bold",
              }}
            >
              Participant & Companions Details
            </Typography>

            {selectedParticipantDetails ? (
              <Fragment>
                {/* Main Participant Details */}
                <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#424242",
                      marginBottom: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Main Participant Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant.name || "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Nationality:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant.nationality || "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Phone Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant.phone_number || "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        WhatsApp Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant.whatsapp_number ||
                          "-"}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                Start Date
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {selectedParticipantDetails.mainParticipant.check_in_date||
                    "-"}
                </Typography>
                <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  End Date
                </Typography>
              </Grid>
                <Typography variant="body1">
                  {selectedParticipantDetails.mainParticipant.check_out_date||
                    "-"}
                </Typography>
              </Grid> */}
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Accommodation Stars:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant
                          .accommodation_stars || "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Total Price(USD):
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        ${selectedParticipantDetails.mainParticipant.invoice.total_price ||
                          "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant.invoice.status ||
                          "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Start Date
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {selectedParticipantDetails.mainParticipant.check_in_date ||
                          "-"}
                      </Typography>
                
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                      End Date
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                      {selectedParticipantDetails.mainParticipant.check_out_date ||
                          "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                      Nights Count
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                      {selectedParticipantDetails.mainParticipant.nights_count ||
                          "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Companions Details */}
                {selectedParticipantDetails.companions.length > 0 ? (
                  selectedParticipantDetails.companions.map((companion, index) => (
                    <Paper
                      key={index}
                      elevation={1}
                      sx={{ padding: 2, marginBottom: 2 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#424242",
                          marginBottom: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Companion {index + 1} Details
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Name:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.name || "-"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Nationality:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.nationality || "-"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Phone Number:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.phone_number || "-"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            WhatsApp Number:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.whatsapp_number || "-"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Start Date:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.check_in_date || "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        Accommodation Stars:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {companion?.accommodation_stars || "-"}
                      </Typography>
                    </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            End Date:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.check_out_date || "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                      Nights Count
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                      {companion?.nights_count ||
                          "-"}
                      </Typography>
                    </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Total Price(USD):
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            ${companion.invoice?.total_price || "-"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Status:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {companion.invoice?.status || "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    No companions available.
                  </Typography>
                )}
              </Fragment>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "#757575",
                  marginTop: 2,
                }}
              >
                No participant details available.
              </Typography>
            )}
          </Box>
        </Drawer>


      </div>
    </div>
  );
};

export default TripParticipantsComponent;
