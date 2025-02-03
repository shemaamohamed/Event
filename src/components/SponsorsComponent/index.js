import React, { useState, useEffect, Fragment } from "react";
import Pagination from "../../CoreComponent/Pagination";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";
import {
  Box,
  Card,
  CardContent,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import { CloseRounded } from "@mui/icons-material";
import { backendUrlImages } from "../../constant/config";
import Select from "../../CoreComponent/Select";

const SponsorsComponent = () => {
  const [sponsorsData, setSponsorsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [conferences, setConferences] = useState([]);
  const [conferenceId, setConferenceId] = useState(null);
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
  const fetchConferences = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BASE_URL}/conferences/all`,
        onSuccess: (data) => {
          setConferences(data.data); // تأكد من أنك تحفظ البيانات بشكل صحيح
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch conferences."),
      });
    } catch (error) {
      setErrorMsg("Failed to fetch conferences.");
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);
  useEffect(() => {
    fetchSponsors();
  }, [conferenceId]);
  const rows = sponsorsData.map((sponsor) => ({
    ...sponsor,
    id: sponsor.id,
    company_name: sponsor.company_name,
    contact_person: sponsor.contact_person,
    status: sponsor.status,
    created_at: sponsor.created_at,
    actions: sponsor.actions,
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
      renderCell: (params) => (
        <>{new Date(params.row.created_at).toLocaleString()}</>
      ),
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
            <MenuItem
              onClick={() => {
                handleViewSponsorDetails(params.row);
              }}
            >
              View Details
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];
  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchSponsorships = async () => {
    const getAuthToken = () => localStorage.getItem("token");
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/package/table/admin`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,

        // withToast: true,
        onSuccess: (data) => {
          if (data?.sponsorships) {
            setSponsorships(data.sponsorships);
          }
        },
      });
    } catch (error) {

    }
  };
  useEffect(() => {


    fetchSponsorships();
  }, []);
  const getSponsorshipById = (id) => {
    const sponsorship = sponsorships.find((sponsor) => sponsor.id === id);
    return sponsorship ? sponsorship.item : 'N/A'; // If found, return the item, otherwise 'N/A'
  };
  const getSponsorshipByIdprice = (id) => {
    const sponsorship = sponsorships.find((sponsor) => sponsor.id === id);
    return sponsorship ? sponsorship.price : 'N/A'; // If found, return the item, otherwise 'N/A'
  };
  return (
    <div
      style={{
        borderRadius: "8px",
        width: "100%",
        maxWidth: "1700px",
        // height: 'calc(100vh - 80px)',
        padding: "20px",
      }}
    >
      <div className="sponsors-component">
        <Typography
          variant="h6"
          sx={{
            color: "#c62828",
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textAlign: "center",
          }}
        >
          All Sponsors
        </Typography>
        {/* <Select
          label="Select Conference"
          options={conferences.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          value={conferenceId}
          setValue={setConferenceId}
        /> */}
        <DataGrid
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          paginationModel={{ page: currentPage - 1, pageSize: 10 }} 
        onPaginationModelChange={(pagination) => {
          setCurrentPage(pagination.page + 1); 
          handlePageChange(pagination.page + 1);
        }}
        rowCount={totalPages * 10}
        pageSizeOptions={[10]}
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

        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
          anchor="right"
          sx={{
            //width
            zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements

            "& .MuiDrawer-paper": {
              zIndex: (theme) => theme.zIndex.modal + 1,

              width: {
                xs: "100%",
                sm: "50%",
                md: "50%",
                lg: "40%",
                xl: "40%",
              },
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 2,
            }}
          >
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseRounded />
            </IconButton>
          </div>
            {/* Sponsor Details */}
            <Typography variant="h6"  gutterBottom
        sx={{
          color: "#9B1321",
          textAlign: "center",
          backgroundColor: "#f1f1f1",
          padding: 1,
          borderRadius: 1,
          marginBottom: 2,
        }}
        >
                        Sponsor Details

        </Typography>
        <Box sx={{ padding: 2,
          overflowY:'auto'
         }}>

           
            {selectedSponsor ? (
              <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Company Name"
                        value={selectedSponsor.company_name || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Contact Person"
                        value={selectedSponsor.contact_person || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Email"
                        value={selectedSponsor.user.email || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Phone Number"
                        value={selectedSponsor.user.phone_number || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="WhatsApp Number"
                        value={selectedSponsor.user.whatsapp_number || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Address"
                        value={selectedSponsor.company_address || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Status"
                        value={selectedSponsor.status || "-"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SimpleLabelValue
                        label="Registration Type"
                        value={selectedSponsor.user.registration_type || "-"}
                      />
                    </Grid>

                    {/* Links to backendUrlImages before simple values */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        color="primary"
                        onClick={() =>
                          window.open(
                            `${backendUrlImages}${selectedSponsor.first_advertisement}`,
                            "_blank"
                          )
                        }
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {selectedSponsor.first_advertisement
                          ? "First Advertisement"
                          : "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        color="primary"
                        onClick={() =>
                          window.open(
                            `${backendUrlImages}${selectedSponsor.second_advertisement}`,
                            "_blank"
                          )
                        }
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {selectedSponsor.second_advertisement
                          ? "Second Advertisement"
                          : "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        color="primary"
                        onClick={() =>
                          window.open(
                            `${backendUrlImages}${selectedSponsor.logo}`,
                            "_blank"
                          )
                        }
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {selectedSponsor.logo ? "Logo" : "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        color="primary"
                        onClick={() =>
                          window.open(
                            `${backendUrlImages}${selectedSponsor.contract_signature}`,
                            "_blank"
                          )
                        }
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {selectedSponsor.contract_signature
                          ? "Contract Signature"
                          : "-"}
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
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              color="#9B1321"
            >
              Invoices
            </Typography>
            {selectedSponsor?.sponsor_invoices && selectedSponsor.sponsor_invoices.length > 0 ? (
              selectedSponsor.sponsor_invoices.map((invoice, index) => (
                <Card key={index} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      {/* Invoice ID */}
                      {invoice?.id && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Invoice ID" value={invoice.id} />
                        </Grid>
                      )}

                      {/* User ID */}
                      {invoice?.user_id && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="User ID" value={invoice.user_id} />
                        </Grid>
                      )}

                      {/* Total Amount */}
                      {invoice?.total_amount && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Total Amount" value={`$${invoice.total_amount}`} />
                        </Grid>
                      )}

                      {/* Square Meters */}
                      {invoice?.square_meters && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Square Meters" value={invoice.square_meters} />
                        </Grid>
                      )}

                      {/* Exhibit Number */}
                      {invoice?.exhibit_number && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Exhibit Number" value={invoice.exhibit_number} />
                        </Grid>
                      )}

                      {/* Shell Scheme Price */}
                      {invoice?.shell_scheme_price && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Shell Scheme Price" value={`$${invoice.shell_scheme_price}`} />
                        </Grid>
                      )}

                      {/* Created At */}
                      {invoice?.created_at && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Created At" value={new Date(invoice.created_at).toLocaleString()} />
                        </Grid>
                      )}

                      {/* Updated At */}
                      {invoice?.updated_at && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Updated At" value={new Date(invoice.updated_at).toLocaleString()} />
                        </Grid>
                      )}

                      {/* Conference Sponsorship Option IDs */}
                      {invoice?.conference_sponsorship_option_ids && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Conference Sponsorship Option IDs" value={invoice.conference_sponsorship_option_ids} />
                        </Grid>
                      )}

                      {/* Booth Cost IDs */}
                      {invoice?.booth_cost_ids && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Booth Cost IDs" value={invoice.booth_cost_ids} />
                        </Grid>
                      )}

                      {/* Sponsorship Option IDs */}
                      {invoice?.sponsorship_option_ids && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue label="Sponsorship Option IDs" value={invoice.sponsorship_option_ids} />
                        </Grid>
                      )}

                      {/* Additional Cost for Shell Scheme Booth */}
                      {invoice?.additional_cost_for_shell_scheme_booth !== undefined && (
                        <Grid item xs={12} md={6}>
                          <SimpleLabelValue
                            label="Additional Cost for Shell Scheme Booth"
                            value={invoice.additional_cost_for_shell_scheme_booth ? "Yes" : "No"}
                          />
                        </Grid>
                      )}

                      {/* Displaying Sponsorship Options */}
                      {invoice?.sponsorshipOptions?.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="h6">Sponsorship Options</Typography>
                          {invoice.sponsorshipOptions.map((option, idx) => (
                            <div key={idx}>
                              {option?.title && <SimpleLabelValue label="Title" value={option.title} />}
                              {option?.description && <SimpleLabelValue label="Description" value={option.description} />}
                              {option?.price && <SimpleLabelValue label="Price" value={`$${option.price}`} />}
                              {option?.created_at && (
                                <SimpleLabelValue label="Created At" value={new Date(option.created_at).toLocaleString()} />
                              )}
                              {option?.updated_at && (
                                <SimpleLabelValue label="Updated At" value={new Date(option.updated_at).toLocaleString()} />
                              )}
                            </div>
                          ))}
                        </Grid>
                      )}

                      {/* Displaying Booth Costs */}
                      {invoice?.boothCosts?.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="h6">Booth Costs</Typography>
                          {invoice.boothCosts.map((booth, idx) => (
                            <div key={idx}>
                              {booth?.size && <SimpleLabelValue label="Size" value={booth.size} />}
                              {booth?.cost && <SimpleLabelValue label="Cost" value={`$${booth.cost}`} />}
                              {booth?.lunch_invitations && <SimpleLabelValue label="Lunch Invitations" value={booth.lunch_invitations} />}
                              {booth?.name_tags && <SimpleLabelValue label="Name Tags" value={booth.name_tags} />}
                              {booth?.created_at && (
                                <SimpleLabelValue label="Created At" value={new Date(booth.created_at).toLocaleString()} />
                              )}
                              {booth?.updated_at && (
                                <SimpleLabelValue label="Updated At" value={new Date(booth.updated_at).toLocaleString()} />
                              )}
                            </div>
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No invoices available for this sponsor.
              </Typography>
            )}

<>
      {selectedSponsor?.sponsor_invoices && selectedSponsor.sponsor_invoices.length > 0 ? (
        selectedSponsor.sponsor_invoices.map((invoice, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Invoice ID */}
          
            

             

                {/* Conference Sponsorship Option IDs */}
                {invoice?.conference_sponsorship_option_ids && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Sponsorship Options</Typography>
                    {JSON.parse(invoice.conference_sponsorship_option_ids).map((id, idx) => (
                      <div key={idx}>
                        <SimpleLabelValue
                          label={`Sponsorship Option ${idx + 1}`}
                          value={getSponsorshipById(id)}
                        />
                            <SimpleLabelValue
                          label={`Price ${idx + 1}`}
                          value={getSponsorshipByIdprice(id)}
                        />
                      </div>
                    ))}
                  </Grid>
                )}
                
                {/* Other fields */}
                {/* You can add other fields here (exhibit_number, square_meters, etc.) */}
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No invoices available for this sponsor.
        </Typography>
      )}
    </>
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default SponsorsComponent;
