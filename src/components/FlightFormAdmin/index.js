import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import AddTripForm from "./tripForm";
import SeatCostForm from "./costForm";
import FlightDetails from "./viewForm";
import CompanionModal from "./CompanionModal "; // تأكد من عدم وجود مسافة إضافية في اسم المكون
import Input from "../../CoreComponent/Input";
import "./style.scss";
import axios from "axios";
import UpdateDeadline from "./SetUpdateDeadline";
import UpdateTicket from "./SetTicket";
import { useNavigate } from "react-router-dom";
import Pagination from "../../CoreComponent/Pagination";
import ViewInvoice from "./ViewInvoice";
import { Drawer, IconButton, Menu, MenuItem } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";



const FlightFormAdmin = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const openMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const headers = [
    { key: "user_name", label: "Passenger Name" },
    { key: "departure_airport", label: "Departure Airport" },
    { key: "arrival_airport", label: "Arrival Airport" },
    // { key: "departure_date", label: "Departure Date" },
    // { key: "arrival_date", label: "Arrival Date" },
    { key: "actions", label: "Actions" },
  ];

  const [openView, setOpenView] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [openTripForm, setOpenTripForm] = useState(false);
  const [openPriceForm, setOpenPriceForm] = useState(false);
  const [openCompanionModal, setOpenCompanionModal] = useState(false); // حالة لفتح المودال
  const [selectedItem, setSelectedItem] = useState({});
  const [travelerName, setTravelerName] = useState("");
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);

  const getFlight = () => {
    const token = localStorage.getItem("token");
    const url = `${BaseUrl}/user/pag/filter?page=${currentPage}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log({ response });

        setFlights(response.data.data);
        setTotalPages(response.data.pagination?.total_pages);
        setCurrentPage(response.data.pagination?.current_page);
      })
      .catch((error) => {
        console.error(
          "Error fetching flight data:",
          error.response ? error.response.data : error.message
        );
      });
  };
  

  const getCompanionFlights = (userId) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BaseUrl}/companion-flight/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCompanions(response.data);
        console.log(response.data);

        setOpenCompanionModal(true); // فتح المودال بعد جلب البيانات
      })
      .catch((error) => {
        console.error(
          "Error fetching companion flight data:",
          error.response ? error.response.data : error.message
        );
      });
  };

  useEffect(() => {
    getFlight();
  }, [currentPage]);

  
  const columns = [
   
    {
      field: "user_name",
      headerName:  "Passenger Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },

    {
      field: "departure_airport",
      headerName:  "Departure Airport",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      
    },
    {
      field: "departure_date",
      headerName:  "Departure Date",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
        field: "arrival_date",
        headerName:  "Arrival Date",
        flex: 1,
        minWidth: 230,
        cellClassName: "centered-cell",
      },

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
                navigate(`/flights/admins/${params.row?.flight_id}`);


             }}>
                             Add Trips

            </MenuItem>
            <MenuItem
             onClick={() => {
              setOpenView(true);
              setSelectedItem(params.row);
            }}

            >
                            view 

                    
            

            </MenuItem> 
            <MenuItem
                          onClick={() =>{
                           
                            getCompanionFlights(params.row.flight_id)

                          } }


            >
                            View Companion


            </MenuItem>
            <MenuItem
            onClick={() => {
              setOpenUpdateForm(true);
              setSelectedItem(params.row);
            }}


            >
              Set Update Deadline


            </MenuItem>
            
            {/* <MenuItem
             onClick={() => {
              setOpenTicketForm(true);
              setSelectedItem(params);
            }}

            >
                            view Ticket

                    
            

            </MenuItem> */}
            <MenuItem
            onClick={() => {
              setOpenInvoice(true);
              setSelectedItem(params.row)
            }}
            >
                            View Invoice


            
            

            </MenuItem>
            
          </Menu>
        </>
      ),
    },
  ];
  const rows = flights.map((row) => {
    return {
      ...row,
      
     
      actions: row.actions, 
    };
  });

 

  return (
    <div
    style={{
      borderRadius: '8px',
      width: '100%',
      maxWidth: '1700px',
      padding: '20px',
    }}
     className="flight-form2">
      <div className="flight-form">
        <div className="flight-form-admin-header">
          <div className="header">
            <Input
              label="Passenger Name	"
              placeholder="Search"
              inputValue={travelerName}
              setInputValue={setTravelerName}
              type="text"
            />
          </div>
        </div>
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
                    getRowId={(row) => row.user_id}
                    checkboxSelection
                    disableRowSelectionOnClick
                  
                  />


        

        <CompanionModal
          isOpen={openCompanionModal}
          setIsOpen={setOpenCompanionModal}
          companions={companions}
          headers={headers}
        />

        
        <Drawer anchor="right"
      
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
       open={openView} onClose={() => setOpenView(false)}>
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
          <IconButton onClick={() => setOpenView(false)}>
           <CloseRounded /> 
          </IconButton>
        </div>
        <FlightDetails data={selectedItem} />


        </Drawer>
        <MySideDrawer isOpen={openTripForm} setIsOpen={setOpenTripForm}>
          <AddTripForm data={selectedItem} setOpen={setOpenTripForm} />
        </MySideDrawer>
        <MySideDrawer isOpen={openPriceForm} setIsOpen={setOpenPriceForm}>
          <SeatCostForm data={selectedItem} setOpen={setOpenPriceForm} />
        </MySideDrawer>
        <Drawer anchor="right"
      
      sx={{
        //width
        zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements

        '& .MuiDrawer-paper': {
            zIndex: (theme) => theme.zIndex.modal + 1,


      width: 
      {
        xs: '100%',
        sm: '20%',
        md: '20%',
        lg: '20%',
        xl: '20%',
      }, 
    },

      }}
       open={openUpdateForm} onClose={() => setOpenUpdateForm(false)}>
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
          <IconButton onClick={() => setOpenUpdateForm(false)}>
           <CloseRounded /> 
          </IconButton>
        </div>
        <UpdateDeadline data={selectedItem}  setOpen={setOpenUpdateForm} />


        </Drawer>
        <Drawer anchor="right"
      
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1, 

        '& .MuiDrawer-paper': {
            zIndex: (theme) => theme.zIndex.modal + 1,


      width: 
      {
        xs: '100%',
        sm: '50%',
        md: '30%',
        lg: '20%',
        xl: '20%',
      }, 
    },

      }}
       open={openTicketForm} onClose={() => setOpenTicketForm(false)}>
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
          <IconButton onClick={() => setOpenTicketForm(false)}>
           <CloseRounded /> 
          </IconButton>
        </div>
        <UpdateTicket data={selectedItem}  />


        </Drawer>

        
       
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
       open={openInvoice} onClose={() => setOpenInvoice(false)}>
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2,
        }}
        >
          <IconButton onClick={() => setOpenInvoice(false)}>
           <CloseRounded /> 
          </IconButton>
        </div>
        <ViewInvoice data={selectedItem}  />

        </Drawer>
       
      </div>
    </div>
  );
};

export default FlightFormAdmin;
