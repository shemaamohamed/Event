import React, { useState } from "react";
import Input from "../../CoreComponent/Input";
import ImageUpload from "../../CoreComponent/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import "./style.scss";
import { Button, Typography } from "@mui/material";

const AdminGallery = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [galleryData, setGalleryData] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handleImageChange = (index, file) => {
    const updatedImages = [...galleryImages];
    updatedImages[index] = file;
    setGalleryImages(updatedImages);
  };

  const addImageField = () => {
    setGalleryImages([...galleryImages, null]);
  };

  const removeImageField = (index) => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", title);
    formData.append("cover_image", coverImage);
    galleryImages.forEach((image, index) => {
      if (image) {
        formData.append(`images[${index}]`, image);
      }
    });

    try {
      const response = await axios.post(`${BaseUrl}/event`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("The Data updated Successfully");
      setGalleryData(response.data.data); // حفظ البيانات المسترجعة
      setTitle("");
      setGalleryImages([]);
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="exhibitions-page" style={{
      marginTop: '15vh',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      margin: "auto",
      width: "100%",
    }}>
      <Typography variant="h5" component="h2" sx={{
        color: "#c62828",
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        padding: 1,
        borderRadius: 1,
        marginBottom: 2,
        width: "100%",
      }}>Add New Gallery</Typography>
      <form className="exhibition-form-container" onSubmit={handleSubmit} style={{ overflowY: 'auto' }}>
        <Input
          label="Gallery Title"
          inputValue={title}
          setInputValue={setTitle}
          required={true}
          errorMsg={errorMsg}
          placeholder="Enter Gallery Title"
        />
        <ImageUpload
          label="Cover Image"
          inputValue={coverImage}
          setInputValue={setCoverImage}
          allowedExtensions={["jpg", "jpeg", "png"]}
          errorMsg={errorMsg}
        />
        {galleryImages.map((_, index) => (
          <div key={index} className="image-upload-container">
            <ImageUpload
              label={`Gallery Image ${index + 1}`}
              inputValue={galleryImages[index]}
              setInputValue={(file) => handleImageChange(index, file)}
              allowedExtensions={["jpg", "jpeg", "png", "mp4", "webm", "ogg"]}
              errorMsg={errorMsg}
            />
            <Button type="button" className="remove-image-btn" onClick={() => removeImageField(index)}>Remove</Button>
          </div>
        ))}
        <Button className="submit-btn" sx={{ marginTop: "20px" }} onClick={addImageField}>Add Image</Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#c62828',
            marginTop: "20px",
            color: "#fff",
            width: "100%",
            "&:hover": { backgroundColor: "#e63946", color: "#fff" }
          }}
          className="submit-btn" type="submit">
          Submit
        </Button>
      </form>
      {galleryData && (
        <div className="gallery-data">
          <Typography variant="h6">Gallery Created:</Typography>
          <p>ID: {galleryData.id}</p>
          <p>Name: {galleryData.name}</p>
          <p>Cover Image: {galleryData.cover_image}</p>
          <p>Images: {galleryData.images}</p>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
