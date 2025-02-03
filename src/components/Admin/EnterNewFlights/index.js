import React, { useEffect, useState } from "react";
import httpService from "../../../common/httpService";
import Table from "../../../CoreComponent/Table";
import "./style.scss";
import AddTripForm from "./addTripForm";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";

const EnterNewFlights = () => {
  const [flights, setFlights] = useState([]);
  const [flight_id, setFlight_id] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const [main_user_id, setMain_user_id] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const navigate = useNavigate();

  const columns = [
    {
      field: "flight_id",
      headerName: "Flight ID",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },

    {
      field: "main_user_id",
      headerName: "main_user_id",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "passenger_name",
      headerName: "Passenger Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "departure_airport",
      headerName: "Departure Airport",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "departure_date",
      headerName: "Departure Date",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "arrival_airport",
      headerName: "Arrival Airport",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "arrival_date",
      headerName: "Arrival Date",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "flight_number",
      headerName: "Flight Number",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },

    {
      field: "actions",
      headerName: "Actions",
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
            <MenuItem
              onClick={() => {
                console.log(params.row?.flight_id);
                console.log(params);
                
                setFlight_id(params.row?.flight_id);
                // setMain_user_id(flight?.flight?.main_user_id)
                setTimeout(() => {
                  setIsOpen(true);
                }, 1000);
              }}
            >
              Add Trip
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];
  const rows = flights.map((row) => {
    return {
      flight_id: row.flight_id,
      main_user_id: row.main_user_id,
      passenger_name: row.passenger_name,
      departure_airport: row.departure_airport,
      arrival_airport: row.arrival_airport,
      departure_date: row.departure_date,
      arrival_date: row.arrival_date,
      flight_number: row.flight_number,
      actions: row.actions,
    };
  });

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/other/accepted-flights`,
        headers: { Authorization: `Bearer ${token}` },
        withToast: false,
        showLoader: true,
      });
      console.log(response);

      if (response?.accepted_flights) {
        const flightsData = response.accepted_flights.map((flight) => ({
          flight_id: flight?.flight?.flight_id,
          main_user_id: flight?.flight?.main_user_id,
          price: flight.price,
          departure_airport: flight.flight?.departure_airport || "N/A",
          arrival_airport: flight.flight?.arrival_airport || "N/A",
          departure_date: flight.flight?.departure_date || "N/A",
          arrival_date: flight.flight?.arrival_date || "N/A",
          flight_number: flight.flight?.flight_number || "N/A",
          passenger_name: flight.flight?.passenger_name || "N/A",
        }));

        setFlights(flightsData.reverse());
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          color: "#c62828",
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          textAlign: "center",
        }}
      >
        Enter Extra Flight Choices
      </Typography>
      <AddTripForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        flight_id={flight_id}
        main_user_id={main_user_id}
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
        getRowId={(row) => row.flight_id}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default EnterNewFlights;
