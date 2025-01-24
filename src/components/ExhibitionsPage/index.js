import React, { useEffect, useState, Fragment } from "react";
import Input from "../../CoreComponent/Input";
import Select from "../../CoreComponent/Select";
import Pagination from "../../CoreComponent/Pagination";
import httpService from "../../common/httpService";
import { backendUrlImages } from "../../constant/config";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Grid, Box, Typography, Button } from "@mui/material";


const ExhibitionsPage = () => {
  // States
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [filters, setFilters] = useState({ name: "", status: "", page: 1 });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });
  const [error, setError] = useState(null);

  // Base URL
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch exhibitions
  const fetchExhibitions = async () => {
    try {
      const { data } = await httpService({
        method: "GET",
        url: `${BASE_URL}/exhibitions`,
        params: {
          search: filters.name,
          status: filters.status,
          page: filters.page,
        },
      });
      setExhibitions(data);
      console.log(exhibitions);

      setPagination({
        currentPage: filters.page,
        totalPages: data.total_pages,
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch exhibitions:", err);
      setError("Unable to load exhibitions. Please try again later.");
    }
  };

  // Effect to trigger data fetching on filters change
  useEffect(() => {
    fetchExhibitions();
  }, [filters]);

  // Handlers
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  return (
    <div className="user-exhibition-cards-container" style={{
      padding:'20px',
    marginTop:'15vh'
    }}>
      <div className="">
      <Box className="exhibitions-header" sx={{ mb: 3 }}>
  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
    {/* Search Input */}
    <Grid item xs={12} sm={6} md={4}>
      <Input
        placeholder="Search"
        inputValue={filters.name}
        setInputValue={(value) => handleFilterChange("name", value)}
        label="Exhibition Name"
        fullWidth
      />
    </Grid>

    {/* Status Select */}
    <Grid item xs={12} sm={6} md={4}>
      <Select
        options={[
          { value: "upcoming", label: "Upcoming" },
          { value: "past", label: "Past" },
        ]}
        value={filters.status}
        setValue={(value) => handleFilterChange("status", value?.value)}
        label="Status"
        fullWidth
      />
    </Grid>
  </Grid>
</Box>

        {error ? (
          <p className="error-message">{error}</p>
        ) : exhibitions.length ? (
          <Grid container spacing={3} className="exhibition-cards-container">
  {exhibitions.map(
    ({ id, title, location, description, image, conference_id }) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
        <Box
          className="exhibition-card"
          p={2}
          borderRadius={2}
          boxShadow={3}
          bgcolor="background.paper"
        >
          {/* Image Section */}
          <Box className="exhibition-card-image" mb={2}>
            {image ? (
              <img
                src={`${backendUrlImages}${image}`}
                alt={title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Box
                className="exhibition-placeholder"
                height={150}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="grey.200"
                borderRadius="8px"
              >
                No Image
              </Box>
            )}
          </Box>
          {/* Details Section */}
          <Box className="exhibition-card-details" mb={2}>
            <Typography
              variant="h6"
              className="exhibition-card-title"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              className="exhibition-card-description"
              color="textSecondary"
            >
              {description}
            </Typography>
            <Typography
              variant="body2"
              className="exhibition-card-location"
              color="textSecondary"
            >
              {location}
            </Typography>
          </Box>
          {/* Buttons Section */}
          <Box className="two-btn" display="flex"  flexDirection={'column'}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor:'#9B1321',
              }}
              onClick={() => {
                navigate(`/one/exhibits/${id}`);
              }}
            >
              View Gallery
            </Button>
            <Button
                          variant="contained"

              fullWidth
              sx={{
                marginTop:'1rem',
                backgroundColor:'#9B1321',
              }}
              onClick={() => {
                navigate(`/register/sponsor/${conference_id}`);
              }}
            >
              Join as Sponsor
            </Button>
          </Box>
        </Box>
      </Grid>
    )
  )}
</Grid>

        ) : (
          <p className="no-data">No exhibitions available.</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => handleFilterChange("page", page)}
      />
    </div>
  );
};

export default ExhibitionsPage;
