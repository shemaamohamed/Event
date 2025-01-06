import React, { Fragment, useEffect, useState } from "react";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../../components/SimpleLabelValue";
import Input from "../../CoreComponent/Input";
import ConferencesAdmin from "../../components/ConferencesAdmin";
import { backendUrlImages } from "../../constant/config";
import SVG from "react-inlinesvg";
import downloadIcon from "../../icons/downloadIcon.svg";
import Select from "../../CoreComponent/Select";
import Pagination from "../../CoreComponent/Pagination";
import EditConferencesAdmin from "../../components/ConferencesAdmin/editForm";
import httpService from "../../common/httpService";
import AirportTransferPrice from "../../components/last_pages/AirportTransfer/AirpotPrice";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";


import "./style.scss";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const ConferencesPage = () => {
  const navigate = useNavigate();
  const [selectedConferenceId, setSelectedConferenceId] = useState(null);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [conferenceData, setConferenceData] = useState({});
  const [conferenceName, setConferenceName] = useState("");
  const [openAddConference, setOpenAddConference] = useState(false);
  const [openEditConference, setOpenEditConference] = useState(false);
  const [allConference, setAllConference] = useState([]);
  const [selectedConference, setSelectedConference] = useState({});
  const [status, setStatus] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleViewClick = (conference) => {
    setSelectedConference(conference);
    setIsDrawerOpen(true)
  };
  const handlePriceClick = (conference) => {
    setSelectedConference(conference);
    setTimeout(() => {
      setIsOpenPrice(true);
    }, [10]);
  };
  const handleEditClick = (conferenceId, conference) => {
    setSelectedConferenceId(conferenceId);
    setConferenceData(conference);

    setTimeout(() => {
      setOpenEditConference(true);
    }, [300]);
  };

  const getConference = () => {
    const searchQuery = conferenceName
      ? `?search=${encodeURIComponent(conferenceName)}`
      : "";
    const url = `${BaseUrl}/con${searchQuery}`;

    httpService({
      method: "GET",
      url,
      params: {
        page: currentPage,
        per_page: 12,
        status: status?.value,
      },
      onSuccess: (data) => {
        console.log(data);
        setTotalPages(data.total_pages);
        setAllConference(data.data);
      },
      onError: (error) => {
        console.error(error);
      },
      showLoader: true,
      withToast: true,
    });
  };

  useEffect(() => {
    getConference();
  }, [conferenceName, currentPage, status]);
  

  return (
    <div className="conferences-page">
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
            placeholder="Search"
            inputValue={conferenceName}
            setInputValue={setConferenceName}
            type="text"
            label={"conference Name"}
          />

          </Grid>
          <Grid item  xs={12} sm={6} md={4}>
          <Select
            options={[
              { value: "upcoming", label: "Upcoming" },
              { value: "past", label: "Past" },
            ]}
            value={status}
            setValue={setStatus}
            label="Status"
            errorMsg={""}
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
              md:"20px"
            },
          }}
         
          >
          <Button
          variant="contained"
          onClick={() => setOpenAddConference(true)}
          sx={{
            backgroundColor: "#c62828",
            color: "white",
            "&:hover": {
              backgroundColor: "#c62834",
            },
          }}
        >
          Add new Conferences
        </Button>
          </Grid>


        </Grid>
      
      <div className="conference-list">
        {allConference?.map((conference) => {
          return (
            <Fragment key={conference.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "20px auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "transform 0.3s, box-shadow 0.3s",
                
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={`${backendUrlImages}${conference.image}`}
                alt={conference.title}
                onError={(e) => {
                  e.target.src = require("./image.jpg");
                }}
                sx={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ padding: "16px 24px" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", marginBottom: "8px" }}
                >
                  {conference.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "4px" }}
                >
                  <strong>Date:</strong> {conference.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Place:</strong> {conference.place}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => handleViewClick(conference)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  onClick={() => handleEditClick(conference.id, conference)}
                  sx={{
                    width: "100%",
                    borderColor: "#d32f2f",
                    color: "#d32f2f",
                    "&:hover": {
                      borderColor: "#b71c1c",
                      backgroundColor: "#ffebee",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => handlePriceClick(conference)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#43a047",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                >
                  Airport Transfer Price
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => navigate(`/table/dinner/speaker/${conference.id}`)}
                  sx={{
                    width: "100%",
                    backgroundColor: "#ffa000",
                    "&:hover": {
                      backgroundColor: "#ff8f00",
                    },
                  }}
                >
                  Dinner Details
                </Button>
              </CardActions>
            </Card>
          </Fragment>
            
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <MySideDrawer isOpen={openAddConference} setIsOpen={setOpenAddConference}>
        <ConferencesAdmin
          setIsOpen={setOpenAddConference}
          getConference={getConference}
        />
      </MySideDrawer>
      <MySideDrawer
        isOpen={openEditConference}
        setIsOpen={setOpenEditConference}
      >
        <EditConferencesAdmin
          setIsOpen={setOpenEditConference}
          getConference={getConference}
          conferenceId={selectedConferenceId}
          setConference={setSelectedConferenceId}
          conferenceData={conferenceData}
        />
      </MySideDrawer>
      {/* <MySideDrawer isOpen={isViewDrawerOpen} setIsOpen={setIsViewDrawerOpen}>
        <div className="conference-details">
          <div className="details-header">{selectedConference?.title}</div>
          <div className="view-con-container">
            <div className="new-section">Main Info</div>
            <div className="info-details">
              <SimpleLabelValue
                label="Start Date"
                value={moment(selectedConference?.start_date).format(
                  "DD-MM-YYYY"
                )}
              />
              <SimpleLabelValue
                label="End Date"
                value={moment(selectedConference?.end_date).format(
                  "DD-MM-YYYY"
                )}
              />
              <SimpleLabelValue
                label="Location"
                value={selectedConference?.location}
              />
            </div>

            <div className="new-section">Committee</div>
            <div className="conference-details-container">
              {selectedConference?.committee_members?.length > 0 ? (
                selectedConference?.committee_members?.map((member, index) => {
                  return (
                    <div key={index} className="committee-member">
                      <img
                        src={`${backendUrlImages}${member.committee_image}`}
                        alt={member.name}
                      />
                      <div className="member-info">
                        {member.name} - {member.role}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No committee members available</div>
              )}
            </div>

            <div className="new-section">Topics</div>
            <div className="topics-container">
              {selectedConference?.scientific_topics ? (
                selectedConference?.scientific_topics?.map((topic, index) => (
                  <div className="topic" key={index}>
                    {topic?.title || ""}
                  </div>
                ))
              ) : (
                <div>No topics available</div>
              )}
            </div>

            <div className="new-section">Downloads</div>
            <div className="downloads-container">
              <SimpleLabelValue
                label="Download First Announcement PDF"
                value={
                  <div>
                    <a
                      href={`${backendUrlImages}${selectedConference?.first_announcement_pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SVG
                        className="delete-icon"
                        src={downloadIcon}
                        height={25}
                        width={25}
                      />
                    </a>
                  </div>
                }
              />
              <SimpleLabelValue
                label=" Download Second Announcement PDF"
                value={
                  <div>
                    <a
                      href={`${backendUrlImages}${selectedConference?.second_announcement_pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SVG
                        className="delete-icon"
                        src={downloadIcon}
                        height={25}
                        width={25}
                      />
                    </a>
                  </div>
                }
              />
              <SimpleLabelValue
                label="Download Conference Brochure PDF"
                value={
                  <div>
                    <a
                      href={`${backendUrlImages}${selectedConference?.conference_brochure_pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SVG
                        className="delete-icon"
                        src={downloadIcon}
                        height={25}
                        width={25}
                      />
                    </a>
                  </div>
                }
              />

              <SimpleLabelValue
                label=" Download Scientific Program PDF"
                value={
                  <div>
                    <a
                      href={`${backendUrlImages}${selectedConference?.conference_scientific_program_pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SVG
                        className="delete-icon"
                        src={downloadIcon}
                        height={25}
                        width={25}
                      />
                    </a>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </MySideDrawer> */}
      <Drawer
      anchor="right"
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1, 

        "& .MuiDrawer-paper": {
          width: { xs: "90%", sm: "70%", md: "50%" },
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
      open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}
      
    >
      <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: 2,
              }}
              >
                <IconButton onClick={() => setIsDrawerOpen(false)}>
                 <CloseRounded /> 
                </IconButton>
              </div>
      <Box>
      
        <Typography variant="h6"  gutterBottom
        sx={{
        
          color: '#c62828',
          fontSize: { xs: '2rem', sm: '2rem', md: '2rem' },
          textAlign: 'center',
        }}
        >
          {selectedConference?.title}
        </Typography>

        <Divider sx={{ marginBottom: "16px" }} />

        <Typography variant="h6" gutterBottom>
          Main Info
        </Typography>
        <Box sx={{ marginBottom: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {moment(selectedConference?.start_date).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {moment(selectedConference?.end_date).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Location:</strong> {selectedConference?.location}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ marginBottom: "16px" }} />

        {/* Committee Section */}
        <Typography variant="h6" gutterBottom>
          Committee
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {selectedConference?.committee_members?.length > 0 ? (
            selectedConference?.committee_members?.map((member, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Avatar
                  src={`${backendUrlImages}${member.committee_image}`}
                  alt={member.name}
                  sx={{ width: 48, height: 48 }}
                />
                <Typography variant="body1">
                  {member.name} - {member.role}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No committee members available</Typography>
          )}
        </Box>

        <Divider sx={{ marginBottom: "16px" }} />

        {/* Topics Section */}
        <Typography variant="h6" gutterBottom>
          Topics
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          {selectedConference?.scientific_topics ? (
            selectedConference?.scientific_topics?.map((topic, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  backgroundColor: "#e0f7fa",
                  padding: "4px 8px",
                  borderRadius: "8px",
                }}
              >
                {topic?.title || ""}
              </Typography>
            ))
          ) : (
            <Typography>No topics available</Typography>
          )}
        </Box>

        <Divider sx={{ marginBottom: "16px" }} />

        {/* Downloads Section */}
        <Typography variant="h6" gutterBottom>
          Downloads
        </Typography>
        <Box>
          {[
            { label: "First Announcement PDF", file: selectedConference?.first_announcement_pdf },
            { label: "Second Announcement PDF", file: selectedConference?.second_announcement_pdf },
            { label: "Conference Brochure PDF", file: selectedConference?.conference_brochure_pdf },
            { label: "Scientific Program PDF", file: selectedConference?.conference_scientific_program_pdf },
          ].map(
            (item, index) =>
              item.file && (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                  >
                    {item.label}
                  </Typography>
                  <IconButton

                  component="a"
                    href={`${backendUrlImages}${item.file}`}
                    target="_blank"
                   
                    rel="noopener noreferrer"
                    sx={{ color: "#1976d2" }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Box>
              )
          )}
        </Box>
      </Box>
    </Drawer>
      <AirportTransferPrice
        isOpen={isOpenPrice}
        setIsOpen={setIsOpenPrice}
        selectedConference={selectedConference}
      />
    </div>
  );
};

export default ConferencesPage;
