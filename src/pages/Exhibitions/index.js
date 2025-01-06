import React, { Fragment, useEffect, useState } from "react";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import Input from "../../CoreComponent/Input";
import { backendUrlImages } from "../../constant/config";
import ImageUpload from "../../CoreComponent/ImageUpload";
import DateInput from "../../CoreComponent/Date";
import axios from "axios";
import toast from "react-hot-toast";
import "./style.scss";
import Select from "../../CoreComponent/Select";
import Pagination from "../../CoreComponent/Pagination";
import ViewFormExhibitions from "./ViewForm";
import EditExhibitionForm from "./EditForm";
import httpService from "../../common/httpService";
import { Button, Card, CardActions, CardContent, CardMedia, Drawer, Grid, IconButton, Typography  } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const ExhibitionForm = ({ setIsOpen, getExhibitions }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [exhibitionImages, setExhibitionImages] = useState([]); // إدارة الصور كصفيف
  const [errorMsg, setErrorMsg] = useState("");
  const [allConference, setAllConference] = useState([]);
  const [conferenceId, setConferenceId] = useState([]);
  const [exhibitionImage, setExhibitionImage] = useState("");
  //
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getConference = () => {
    const url = `${BaseUrl}/conferences/all`;

    axios
      .get(url)
      .then((response) => {
        setAllConference([
          { label: "None", value: null },
          ...response.data.data?.map((item) => {
            return { label: item?.title, value: item?.id };
          }),
        ]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getConference();
  }, []);

  const handleImageChange = (index, file) => {
    const updatedImages = [...exhibitionImages];
    updatedImages[index] = file;
    setExhibitionImages(updatedImages);
  };

  const addImageField = () => {
    setExhibitionImages([...exhibitionImages, null]);
  };

  const removeImageField = (index) => {
    const updatedImages = exhibitionImages.filter((_, i) => i !== index);
    setExhibitionImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (conferenceId?.value) {
      formData.append("conference_id", conferenceId?.value);
    } else {
      formData.append("conference_id", "");
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("image", exhibitionImage);
    exhibitionImages.forEach((image, index) => {
      if (image) {
        formData.append(`images[${index}]`, image);
      }
    });

    try {
      const response = await axios.post(`${BaseUrl}/exhibitions`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("The Data updated Successfully");
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setExhibitionImages([]);
      getExhibitions();
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <form className="exhibition-form-container" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h2" sx={{textAlign:"center",
         color: "#c62828",
        marginBottom:"20px",
        backgroundColor:'#f1f1f1'



        }}>Add New Exhibition</Typography>
        <Select
          options={allConference}
          value={conferenceId}
          setValue={setConferenceId}
          label="Conference Id"
          errorMsg={""}
        />
        <Input
          label="Exhibition Title"
          inputValue={title}
          setInputValue={setTitle}
          required={true}
          errorMsg={errorMsg}
          placeholder="Enter Exhibition Title"
        />
        <Input
          label="Description"
          inputValue={description}
          setInputValue={setDescription}
          required={false}
          errorMsg={errorMsg}
          placeholder="Enter a brief description"
        />
        <ImageUpload
          label="Exhibition Images"
          inputValue={exhibitionImage}
          setInputValue={setExhibitionImage}
          allowedExtensions={["jpg", "jpeg", "png"]}
          errorMsg={errorMsg}
        />
        <Input
          label="Exhibition Location"
          inputValue={location}
          setInputValue={setLocation}
          required={true}
          errorMsg={errorMsg}
          placeholder="Enter Exhibition Location"
        />
        <DateInput
          label="Start Date"
          inputValue={startDate}
          setInputValue={setStartDate}
          type="date"
          required={true}
          errorMsg={errorMsg}
        />
        <DateInput
          label="End Date"
          inputValue={endDate}
          setInputValue={setEndDate}
          type="date"
          required={false}
          errorMsg={errorMsg}
        />

        {exhibitionImages.map((_, index) => (
          <div key={index} className="image-upload-container">
            <ImageUpload
              label={`Exhibition Image ${index + 1}`}
              inputValue={exhibitionImages[index]}
              setInputValue={(file) => handleImageChange(index, file)}
              allowedExtensions={["jpg", "jpeg", "png"]}
              errorMsg={errorMsg}
            />
            <Button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImageField(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button 
        className="submit-btn" 
        sx={{
          marginTop: "20px"

        }}
         onClick={addImageField}>
          Add Image
        </Button>
      

        
        <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#c62828',// Modern vibrant red
        
                      marginTop: "20px",
                      color: "#fff",
                      width: "100%",
                      "&:hover": {
                        backgroundColor: "#e63946",
                        color: "#fff",
                      }
                    }}

         className="submit-btn" type="submit">
          Submit
        </Button>
    </form>
  );
};

const Exhibitions = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [exhibitionData, setExhibitionData] = useState({});
  const [exhibitionName, setExhibitionName] = useState("");
  const [openAddExhibition, setOpenAddExhibition] = useState(false);
  const [allExhibitions, setAllExhibitions] = useState([]);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openViewForm, setOpenViewForm] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (exhibition) => {
    setIsEditDrawerOpen(true);
    setExhibitionData(exhibition);
  };

  const getExhibitions = async () => {
    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/exhibitions`,
        params: {
          search: exhibitionName,
          status: status?.value,
          page: currentPage,
        },
        onSuccess: (data) => {
          setTotalPages(data.total_pages);
          setAllExhibitions(data.data); // Adjust according to your API response structure
        },
        onError: (error) => {
          console.error("Error fetching exhibitions:", error);
        },
        showLoader: true,
        withToast: true,
      });
    } catch (err) {
      console.error("Error in getExhibitions:", err);
    }
  };

  useEffect(() => {
    getExhibitions();
  }, [exhibitionName, status, currentPage]);

  return (
    <div className="exhibitions-page">
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
            inputValue={exhibitionName}
            setInputValue={setExhibitionName}
            type="text"
            label={"Exhibition Name"}
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
              md:"22px"
            },
          }}
         
          >
          <Button
          variant="outlined"
          color="secondary"

          onClick={() => setOpenAddExhibition(true)}


          sx={{
            borderColor: "#d32f2f",
            color: "#d32f2f",
            "&:hover": {
              borderColor: "#b71c1c",
              backgroundColor: "#ffebee",
            },
          }}
           
        
        >
                    Add new Exhibitions

        </Button>
          </Grid>


        </Grid>
      
      <div className="exhibition-list">
        {allExhibitions?.map((exhibition) => (
          <Fragment key={exhibition.id}>
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
              src={`${backendUrlImages}${exhibition.image}`}
              alt={exhibition.title}
             
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
                {exhibition.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: "4px" }}
              >
                <strong>Date:</strong> {exhibition.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Place:</strong> {exhibition.place}
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
                onClick={() => {
                  console.log("yes");

                      setOpenViewForm(true);
                      setExhibitionData(exhibition);
                }}
                sx={{
                  width: "100%",
                  
                }}
              >
                View
              </Button>
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                    onClick={() => {
                      handleEditClick(exhibition);
                    }}
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
              
            </CardActions>
          </Card>
        </Fragment>
         
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ViewFormExhibitions
        isOpen={openViewForm}
        setIsOpen={setOpenViewForm}
        exhibitionData={exhibitionData}
      />

      <Drawer 
            anchor="right"
            open={openAddExhibition}
            onClose={() => setOpenAddExhibition(false)}
            sx={{
              zIndex: (theme) => theme.zIndex.modal + 1, 
      
              "& .MuiDrawer-paper": {
                width: { xs: "100%", sm: "100%", md: "50%" },
                padding: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
      <IconButton             onClick={() => setOpenAddExhibition(false)}
      >
        <CloseRounded />
      </IconButton>
    </div>
        <ExhibitionForm
          setIsOpen={setOpenAddExhibition}
          getExhibitions={getExhibitions}
        />
      </Drawer>
      <Drawer
       anchor="right"
       open={isEditDrawerOpen}
       onClose={() => setIsEditDrawerOpen(false)}
       sx={{
         zIndex: (theme) => theme.zIndex.modal + 1, 
 
         "& .MuiDrawer-paper": {
           width: { xs: "100%", sm: "100%", md: "50%" },
           padding: "24px",
           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
      <IconButton             onClick={() =>setIsEditDrawerOpen(false)}
      >
        <CloseRounded />
      </IconButton>
    </div>
        <EditExhibitionForm
          setIsOpen={setIsEditDrawerOpen}
          getExhibitions={getExhibitions}
          exhibitionData={exhibitionData}
        />
     
      </Drawer>
    </div>
  );
};

export default Exhibitions;
