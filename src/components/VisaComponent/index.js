import React, { useState, useEffect, Fragment } from "react";
import httpService from "../../common/httpService";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Divider, Drawer, Grid, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { AttachMoney, CalendarToday, Cancel, CloseRounded } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { CheckCircle } from "lucide-react";
import { backendUrlImages } from "../../constant/config";

const VisasComponent = () => {
  const [visasData, setVisasData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");
  const navigate = useNavigate();
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
  

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch visas.";

  // Fetch visas data
  const fetchVisas = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/all/visas`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setVisasData(data.visas || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => {
        },
        withToast: false,
      });
    } catch (error) {
    }
  };

  const handlePageChange = (page) => {
    fetchVisas(page);
  };

  const handleViewVisaDetails = (visa) => {
    setSelectedVisa(visa);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchVisas();
  }, []);

  const rows = visasData.map((visa) => ({
    ...visa,
    id: visa.id,
    user_name: visa.user_name,
    user_id: visa.user_id,
    passport_image:visa?.passport_image,
    arrival_date: visa.arrival_date,
    departure_date: visa.departure_date,
    visa_cost: `$${visa.visa_cost}`,
    status: visa.status,
    created_at: visa.created_at,
    actions: "actions",
  }));
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "user_name",
      headerName: "User Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",

    },{
      field: "passport_image",
      headerName: "Passport Image",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        <div style={{ textAlign: "center" }}>
          {params.row.passport_image ? (
            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => {
                const imageUrl = `${backendUrlImages}${params.row.passport_image}`;
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = params.row.passport_image; // يعين اسم الصورة عند التنزيل
                link.click(); // تنفيذ عملية التنزيل
              }}
            >
              Download Image
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No Image
            </Typography>
          )}
        </div>
      ),
    }
    
    ,{
      field:"arrival_date",
      headerName:"Arrival Date",
      flex:1,
      minWidth:230,
      cellClassName:"centered-cell",
    },{
      field:"departure_date",
      headerName:"Departure Date",
      flex:1,
      minWidth:230,
      cellClassName:"centered-cell",
    },{
      field:"visa_cost",
      headerName:"Visa Cost",
      flex:1,
      minWidth:230,
      cellClassName:"centered-cell",
    },{
      field:"status",
      headerName:"Status",
      flex:1,
      minWidth:230,
      cellClassName:"centered-cell",
    },{
      field:"created_at",
      headerName:"Created At",
      flex:1,
      minWidth:230,
      cellClassName:"centered-cell",
      renderCell: (params) => (
        <>
          <Typography>
            {new Date(params.row.created_at).toLocaleString()}
          </Typography>
        </>
      )

    },{
      field:"actions",
      headerName:"Actions",
      flex:1,
      minWidth:230,
      cellClassName:"centered-cell",
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
                       onClick={() => handleViewVisaDetails(params.row)}


             >
                        View Details

            </MenuItem> 
            {params.row.status === "pending" && (
              <MenuItem
                onClick={() => {
                  navigate(`/admin/visa2/${params.row?.user_id}`);
                }}
              >
                Submit
              </MenuItem>
            )}
            
          </Menu>
        </>
      ),
    }
    
  ];

  return (
      <div className="visas-component" style={{
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1700px',
        padding: '20px',
      }}>
        <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
              >Visa</Typography>
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

        <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}
        anchor="right"
        sx={{
          //width
          zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements
  
          '& .MuiDrawer-paper': {
              zIndex: (theme) => theme.zIndex.modal + 1,
  
  
        width: 
        {
          xs: '100%',
          sm: '50%',
          md: '40%',
          lg: '30%',
          xl: '30%',
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
                    <Card elevation={4} style={{ margin: "16px 0", borderRadius: "8px" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ fontWeight: "bold", marginBottom: "16px", textAlign: "center" ,color:"#c62828" }}
        >
          Visa Details
        </Typography>
        <Divider style={{ marginBottom: "16px" }} />
        {selectedVisa ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <CalendarToday color="primary" style={{ marginRight: "8px" }} />
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  User ID:
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginLeft: "32px" }}>
                {selectedVisa.user_id || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <CalendarToday color="primary" style={{ marginRight: "8px" }} />
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Arrival Date:
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginLeft: "32px" }}>
                {selectedVisa.arrival_date || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <CalendarToday color="primary" style={{ marginRight: "8px" }} />
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Departure Date:
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginLeft: "32px" }}>
                {selectedVisa.departure_date || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <AttachMoney color="success" style={{ marginRight: "8px" }} />
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Visa Cost:
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginLeft: "32px" }}>
                {selectedVisa.visa_cost || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                {selectedVisa.payment_required ? (
                  <CheckCircle color="success" style={{ marginRight: "8px" }} />
                ) : (
                  <Cancel color="error" style={{ marginRight: "8px" }} />
                )}
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Payment Required:
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginLeft: "32px" }}>
                {selectedVisa.payment_required ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Status:
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginLeft: "32px" }}>
                {selectedVisa.status || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Payment Status:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: "6px" }}>
                {selectedVisa.payment_status || "-"}
              </Typography>
              </Box>
              
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center"  >
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Created At:{' '}
                  {selectedVisa.created_at
                  ? new Date(selectedVisa.created_at).toLocaleString()
                  : "-"}
                </Typography>
               
              </Box>
              
            </Grid>
          </Grid>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textAlign: "center" }}
          >
            No visa details available.
          </Typography>
        )}
      </CardContent>
    </Card>

        </Drawer>

       
      </div>
  );
};

export default VisasComponent;
