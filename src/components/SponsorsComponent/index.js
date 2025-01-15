

import React, { useState, useEffect, Fragment } from "react";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import { Box, Card, CardContent, Drawer, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";
import { backendUrlImages } from "../../constant/config";

const SponsorsComponent = () => {
  const [sponsorsData, setSponsorsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
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

 

  const DEFAULT_ERROR_MESSAGE = "Failed to fetch sponsors.";

  // Fetch sponsors data
  const fetchSponsors = async (page = 1) => {
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/sponsor/all`,
        params: { page },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (data) => {
          setSponsorsData(data.sponsors || []);
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
    fetchSponsors(page);
  };

  const handleViewSponsorDetails = (sponsor) => {
    setSelectedSponsor(sponsor);
    setDrawerOpen(true);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const rows = sponsorsData.map((sponsor) => ({
    ...sponsor,
    id: sponsor.id,
    company_name: sponsor.company_name,
    contact_person: sponsor.contact_person,
    status: sponsor.status,
    created_at: sponsor.created_at,
    actions: sponsor.actions,
  }));
  const columns = [{
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
  },
    {
      field: "company_name",
      headerName: "Company Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "contact_person",
      headerName: "Contact Person",
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
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell:(params)=>(
        <>
        {
                    new Date(params.row.created_at).toLocaleString()

        }
        </>
      )
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
                handleViewSponsorDetails(params.row);

             }}>
               View Details
            </MenuItem> 
            </Menu>

       </>
      ),
    }
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
      <div className="sponsors-component">
      <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              All Sponsors
            </Typography>
         <DataGrid
                getRowId={(row) => row.id}
                rows={rows}
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
       

        <Drawer open={isDrawerOpen} onClose={()=>{setDrawerOpen(false)}}
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
                  <Box sx={{ padding: 2 }}>
      {/* Sponsor Details */}
      <Typography variant="h5" component="div" gutterBottom       color="#c62828"
      >
        Sponsor Details
      </Typography>
      {selectedSponsor ? (
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <SimpleLabelValue
                label="Company Name"
                value={selectedSponsor.company_name || "-"}
              />

              </Grid>
              <Grid item xs={6}>
              <SimpleLabelValue
                label="Contact Person"
                value={selectedSponsor.contact_person || "-"}
              />
                
              </Grid>
              <Grid item xs={6}>
                
              <SimpleLabelValue
                label="Email"
                value={selectedSponsor.user.email || "-"}
              />
                
              </Grid>
              <Grid item xs={6}>
              <SimpleLabelValue
                label="Phone Number"
                value={selectedSponsor.user.phone_number || "-"}
              />
                
              </Grid>
              <Grid item xs={6}>
              <SimpleLabelValue
                label="WhatsApp Number"
                value={selectedSponsor.user.whatsapp_number || "-"}
              />
                
              </Grid>
              <Grid item xs={6}>
              <SimpleLabelValue
                label="Address"
                value={selectedSponsor.company_address || "-"}
              />
                
                </Grid>
                <Grid item xs={6}>
                <SimpleLabelValue
                label="Status"
                value={selectedSponsor.status || "-"}
              />
                
                </Grid>
                <Grid item xs={6}>
                <SimpleLabelValue
                label="Registration Type"
                value={selectedSponsor.user.registration_type || "-"}
              />
                
              </Grid>
             
 {/* Links to backendUrlImages before simple values */}
 <Grid item xs={6}>
  <Typography
    variant="body2"
    color="primary"
    onClick={() => window.open(`${backendUrlImages}${selectedSponsor.first_advertisement}`, "_blank")}
    style={{ cursor: "pointer", textDecoration: "underline" }}
  >
    {selectedSponsor.first_advertisement ? "First Advertisement" : "-"}
  </Typography>
</Grid>

<Grid item xs={6}>
  <Typography
    variant="body2"
    color="primary"
    onClick={() => window.open(`${backendUrlImages}${selectedSponsor.second_advertisement}`, "_blank")}
    style={{ cursor: "pointer", textDecoration: "underline" }}
  >
    {selectedSponsor.second_advertisement ? "Second Advertisement" : "-"}
  </Typography>
</Grid>

<Grid item xs={6}>
  <Typography
    variant="body2"
    color="primary"
    onClick={() => window.open(`${backendUrlImages}${selectedSponsor.logo}`, "_blank")}
    style={{ cursor: "pointer", textDecoration: "underline" }}
  >
    {selectedSponsor.logo ? "Logo" : "-"}
  </Typography>
</Grid>

<Grid item xs={6}>
  <Typography
    variant="body2"
    color="primary"
    onClick={() => window.open(`${backendUrlImages}${selectedSponsor.contract_signature}`, "_blank")}
    style={{ cursor: "pointer", textDecoration: "underline" }}
  >
    {selectedSponsor.contract_signature ? "Contract Signature" : "-"}
  </Typography>
</Grid>

             
              
              
              
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No sponsor details available.
        </Typography>
      )}

      {/* Invoices */}
      <Typography variant="h5" component="div" gutterBottom
      color="#c62828"
      >
        Invoices
      </Typography>
      {selectedSponsor?.sponsor_invoices &&
      selectedSponsor.sponsor_invoices.length > 0 ? (
        selectedSponsor.sponsor_invoices.map((invoice, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
              <Grid item xs={6}>
              <SimpleLabelValue label="Invoice ID" value={invoice.id} />

                
                </Grid>
                <Grid item xs={6}>
                <SimpleLabelValue
                  label="Total Amount"
                  value={`$${invoice.total_amount}`}
                />
                
                </Grid>
                <Grid item xs={6}>
                <SimpleLabelValue
                  label="Total Amount"
                  value={`$${invoice.total_amount}`}
                />
                
                </Grid>
                <Grid item xs={6}>
                <SimpleLabelValue
                  label="Created At"
                  value={new Date(invoice.created_at).toLocaleString()}
                />
                
                </Grid>
                
               
                <Grid item xs={6}>
                      <SimpleLabelValue
                        label="First Advertisement"
                        value={selectedSponsor.first_advertisement || "-"}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleLabelValue
                        label="Second Advertisement"
                        value={selectedSponsor.second_advertisement || "-"}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleLabelValue
                        label="Logo"
                        value={selectedSponsor.logo || "-"}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <SimpleLabelValue
                        label="Contract Signature"
                        value={selectedSponsor.contract_signature || "-"}
                      />
                    </Grid>
                
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No invoices available for this sponsor.
        </Typography>
      )}
    </Box>
        </Drawer>

        
      </div>
    </div>
  );
};

export default SponsorsComponent;
