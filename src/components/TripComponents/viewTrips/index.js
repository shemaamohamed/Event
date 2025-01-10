import React, { useEffect, useState } from "react";
import Table from "../../../CoreComponent/Table";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";
import axios from "axios";
import CreateTrip from "../AddTrip";
import AddOption from "../AddOptions";
import ViewOneTrip from "../ViewOneTrip";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import EditTrip from "../EditTrip";
import httpService from "../../../common/httpService";
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const headers = [
  { key: "id", label: "ID" },
  { key: "trip_type", label: "Trip Type" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "location", label: "Location" },
  { key: "trip_details", label: "Trip Details" },
  { key: "actions", label: "Actions" },
];

const tripTypes = [
  { value: "private", label: "Private" },
  { value: "group", label: "Group" },
  { value: "", label: "" },
];

const ViewTrip = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [tripName, setTripName] = useState("");
  const [tripType, setTripType] = useState("");
  const [isAddTrip, setAddTrip] = useState(false);
  const [isAddPrice, setAddPrice] = useState(false);
  const [tripId, setTripId] = useState(false);
  const [viewOneTrip, setViewOneTrip] = useState(false);
  const [openEditTrip, setOpenEditTrip] = useState(true);
  const [open, setOpen] = useState(false);
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
  const BaseUrl = process.env.REACT_APP_BASE_URL;;

  const fetchTrips = async () => {
    const token = localStorage.getItem("token");

    const params = {};
    if (tripType) {
      params.trip_type = tripType?.value;
    }
    if (tripName) {
      params.name = tripName;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/all-trip`,
        headers,
        params,
        onSuccess: (data) => {
          const newData = data?.trips?.map((item) => ({
            ...item,
            actions: item.actions
          }));
          setRows(newData);
        },
        onError: (error) => {
          console.error("Error fetching trips:", error);
        },
        withLoadder: true,
        withToast: true, // Show toast notifications
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [tripType, tripName]);
  const columns =[
    {
      field:"id",
      headerName: "ID",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",

    },
    { field: "name", headerName: "Trip Name", flex: 1, minWidth: 230, cellClassName: "centered-cell", },
    { field: "trip_type", headerName: "Trip Type", flex: 1, minWidth: 230, cellClassName: "centered-cell", },{
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "trip_details",
      headerName: "Trip Details",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell", 
    },
    { field: "actions", headerName: "Actions", flex: 0.2, minWidth: 230, cellClassName: "centered-cell", 
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
            {params.row.status === "pending" && (
              <>
               <MenuItem 
                       onClick={() => {
                        setAddPrice(true);
                        setTripId(params.row?.id);
                       }}


             >
                              Add Prices


            </MenuItem> 
            <MenuItem
              onClick={() => {
                setViewOneTrip(true);
                setTripId(params.row?.id);
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenEditTrip(true);
                setOpen(true);
                setTripId(params.row?.id);
              }}>
                                Edit

              </MenuItem>
              </>

            )}
            
            
            
          </Menu>
        </>
      ),
    },
  ]

  return (
    <div className="trips-page-container">
      <Grid container spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
      >
        <Grid item xs={12} sm={6} md={4} >  
          
        <Input
            label="Trip Name"
            placeholder="Enter trip name"
            inputValue={tripName}
            setInputValue={setTripName}
            type="text"
          />
        

          </Grid>
          <Grid item  xs={12} sm={6} md={4}>
          <Select
            options={tripTypes}
            value={tripType}
            setValue={setTripType}
            label="Trip Type"
            placeholder="Select trip type"
          />
          </Grid>
          <Grid item  xs={12} sm={6} md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop:{
              xs:"0px",
              sm:"0px",
              md:"22px"
            },
          }}
         
          >
          <Button
          variant="outlined"
          color="secondary"

          onClick={() => setAddTrip(true)}


          sx={{
            borderColor: "#d32f2f",
            color: "#d32f2f",
            "&:hover": {
              borderColor: "#b71c1c",
              backgroundColor: "#ffebee",
            },
          }}
           
        
        >
          Add new Trip
        </Button>
          </Grid>


      </Grid>
        

      <CreateTrip isOpen={isAddTrip} setIsOpen={setAddTrip} fetchTrips={fetchTrips} />
      <AddOption isOpen={isAddPrice} setIsOpen={setAddPrice} tripId={tripId} />
      <ViewOneTrip
        isOpen={viewOneTrip}
        setIsOpen={setViewOneTrip}
        tripId={tripId}
      />

      <EditTrip isOpen={open} setIsOpen={setOpen} tripId={tripId} />
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
    </div>
  );
};

export default ViewTrip;
