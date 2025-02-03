import React, { useState, useEffect, Fragment } from "react";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Button } from '@mui/material';
import axios from "axios";

import "./style.scss";
import Invoce from "./invoice";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";
import toast from "react-hot-toast";

const TripParticipantsForUser = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isInvoiveOpen, setInvoiveOpen] = useState(false);
  const [participantIds, setparticipantIds] = useState([]);
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
const navigate = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");



  const fetchParticipants = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/user/trip`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          const formattedParticipants = data.trips.map((entry) => ({
            id: entry.trip.id,
            tripName: entry.trip.name,
            description: entry.trip.description,
            price_per_person: entry.trip.price_per_person,
            location: entry.trip.location,
            duration: entry.trip.duration,
            price_for_two: entry.trip.price_for_two,
            available_dates: entry.trip.available_dates,
            companions: entry.companions,
            mainUser: entry.mainUser,
          }));
          setParticipantsData(formattedParticipants);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        withToast: false,
      });
    } catch (error) {
      setErrorMsg("Error fetching data.");
    }
  };
  function getParticipantIds(data) {
    console.log(data.mainUser);

    // Check if mainUser and companions are arrays before mapping
    const mainUserIds = Array.isArray(data.mainUser)
      ? data.mainUser.map((user) => user.id)
      : [];
    const companionIds = Array.isArray(data.companions)
      ? data.companions.map((companion) => companion.id)
      : [];

    // Combine the IDs and remove duplicates using a Set
    const participantIds = [...mainUserIds, ...companionIds];

    return { participant_ids: participantIds };
  }


  const handleViewDetails = (participant) => {
    setSelectedParticipantDetails(participant);
    setDrawerOpen(true);
  };
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const handleDelete = (tripId) => {
    // استرجاع التوكن من localStorage
    const token = localStorage.getItem("token");
  
    // التأكد من وجود التوكن
    if (!token) {
      toast.error("You must be logged in to delete the trip.");
      return;
    }
  
    // إرسال طلب DELETE باستخدام axios مع التوكن في الهيدر
    axios.delete(`${BaseUrl}/myTrip/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // تمرير التوكن في الهيدر
      }
    })
    .then((response) => {
      toast.success("Trip deleted successfully!");
      fetchParticipants();
    })
    .catch((error) => {
      // التعامل مع الأخطاء
      console.error(error);
      toast.error("An error occurred while deleting the trip.");
    });
  };
  
  useEffect(() => {
    fetchParticipants();
  }, []);

  const row = participantsData.map((participant) => ({
    ...participant,

    
    actions: participant?.actions,
  }));
  const columns=[
    {
    field:'id',
    headerName:'ID',
    minWidth: 230,
    flex:1,
    cellClassName: "centered-cell",

  },
   {
    field:'tripName',
    headerName:'Trip Name',
    minWidth: 250,
    flex:1,
    cellClassName: "centered-cell",
  },
  {
    field:'description',
    headerName:'Description',
    minWidth: 250,
    flex:1,
    cellClassName: "centered-cell",
  },
  {
    field:'price_per_person',
    headerName:'Price Per Person',
    minWidth: 250,

    flex:1,
    cellClassName: "centered-cell",
  },
  {
    field:'location',
    headerName:'Location',
    minWidth: 250,

    flex:1,
    cellClassName: "centered-cell",
  },
  {
    field:'duration',
    headerName:'Duration',
    minWidth: 250,

    flex:1,
    cellClassName: "centered-cell",
  },
  {
    field:'price_for_two',
    headerName:'Price For Two',
    minWidth: 250,

    flex:1,
    cellClassName: "centered-cell",
  },

  {
    field:'companions',
    headerName:'Companions',
    minWidth: 250,
    flex:1,
    cellClassName: "centered-cell",
    renderCell: (params) => (
      <div>
        {params.row.companions.length}
      </div>
    ),
  },
  {
    field:'actions',
    headerName:'Actions',
    minWidth: 250,
    flex:1,
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

                                  
                                  handleViewDetails(params.row);}}

           >
             View Details
          </MenuItem> 
          <MenuItem 
                                onClick={() => {

                                  
                                  handleDelete(params.row.id);}}

           >
Delete         
 </MenuItem> 
        </Menu>
      </>
    ),
  },
   
 
  ]

  return (
    <>
      <div
      style={{
        padding: "20px",
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
        My Trips
      </Typography>
         <DataGrid
                      rows={row}
                      columns={columns}
                      getRowId={(row) => row.id}
                      paginationModel={{ page: currentPage - 1, pageSize: 12 }} 
        onPaginationModelChange={(pagination) => {
          setCurrentPage(pagination.page + 1); 
          fetchParticipants(pagination.page + 1);
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

        <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} anchor="right"
      
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

      }}>
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
               { selectedParticipantDetails ? (
   <Grid container spacing={3} className="participant-details" padding={2}>
   {/* Trip Details */}
   <Grid item xs={12}>
     <Typography variant="h6" className="head"
     sx={{
        
      color: '#c62828',
      backgroundColor:'#f1f1f1',

      textAlign: 'center',
    }}
     >
       Trip Details
     </Typography>
   </Grid>
   <Grid item xs={12} container spacing={2}>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Name" value={selectedParticipantDetails.tripName || '-'} />
     </Grid>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Description" value={selectedParticipantDetails.description || '-'} />
     </Grid>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Location" value={selectedParticipantDetails.location || '-'} />
     </Grid>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Price Per Person" value={`$${selectedParticipantDetails.price_per_person || '-'}`} />
     </Grid>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Duration in Days" value={selectedParticipantDetails.duration || '-'} />
     </Grid>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Price for Two" value={`$${selectedParticipantDetails.price_for_two || '-'}`} />
     </Grid>
     <Grid item xs={12} sm={6}>
       <SimpleLabelValue label="Price for Three or More" value={`$${selectedParticipantDetails.price_for_three_or_more || '-'}`} />
     </Grid>
     <Grid item xs={12}>
       <SimpleLabelValue
         label="Available Dates"
         value={selectedParticipantDetails.available_dates
           ?.split(',')
           ?.map((date, index) => (
             <Typography key={index} component="span">
               {date}
             </Typography>
           ))}
       />
     </Grid>
   </Grid>
 
   {/* Main User Details */}
   <Grid item xs={12}>
     <Typography variant="h6" className="head"  sx={{
        
        color: '#c62828',
        backgroundColor:'#f1f1f1',
  
        textAlign: 'center',
      }}>
       You
     </Typography>
   </Grid>
   {selectedParticipantDetails?.mainUser?.map((user, index) => (
     <Fragment key={index}>
       <Grid item xs={12}>
         <Typography variant="subtitle1" className="head2">
           Main User
         </Typography>
       </Grid>
       <Grid item xs={12} container spacing={2}>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Name" value={user.name || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Phone" value={user.phone_number || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="WhatsApp" value={user.whatsapp_number || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Nationality" value={user.nationality || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Start Date" value={user.check_in_date || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="End Date" value={user.check_out_date || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Nights Count" value={user.nights_count || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Accommodation Stars" value={`${user.accommodation_stars} stars`} />
         </Grid>
       </Grid>
       <Grid item xs={12}>
         <Button
            variant="outlined"
           color="error"
           onClick={() => navigate(`/invoice/trip/${user?.id}/${user?.name}`)}
         >
           View Invoice
         </Button>
       </Grid>
     </Fragment>
   ))}
 
   {/* Companions Details */}
   <Grid item xs={12}>
     <Typography variant="h6" className="head"  sx={{
        
        color: '#c62828',
        backgroundColor:'#f1f1f1',
  
        textAlign: 'center',
      }}>
       Companions
     </Typography>
   </Grid>
   {selectedParticipantDetails?.companions?.map((companion, index) => (
     <Fragment key={index}>
       <Grid item xs={12}>
         <Typography variant="subtitle1" className="head2">
           Companion {index + 1}
         </Typography>
       </Grid>
       <Grid item xs={12} container spacing={2}>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Name" value={companion.name || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Phone" value={companion.phone_number || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="WhatsApp" value={companion.whatsapp_number || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Nationality" value={companion.nationality || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Start Date" value={companion.check_in_date || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="End Date" value={companion.check_out_date || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Nights Count" value={companion.nights_count || '-'} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Accommodation Stars" value={`${companion.accommodation_stars} stars`} />
         </Grid>
         <Grid item xs={12} sm={6}>
           <SimpleLabelValue label="Total Price(USD)" value={`$${companion.invoice?.total_price || '-'}`} />
         </Grid>
       </Grid>
       <Grid item xs={12}>
         <Button
           variant="outlined"
           color="error"
           onClick={() => navigate(`/invoice/trip/${companion?.id}/${companion?.name}`)}
         >
           View Invoice
         </Button>
       </Grid>
     </Fragment>
   ))}
 </Grid>
 
  ) : (
    <Typography>No participant details available.</Typography>
  )
}
        </Drawer>

     
      </div>
      <Invoce
        isInvoiveOpen={isInvoiveOpen}
        setInvoiveOpen={setInvoiveOpen}
        participantId={participantIds}
      />
    </>
  );
};

export default TripParticipantsForUser;
