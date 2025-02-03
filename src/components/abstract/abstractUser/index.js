import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Input from "../../../CoreComponent/Input";
import PhoneNumberInput from "../../../CoreComponent/PhoneNumber";
import Select from "../../../CoreComponent/Select";
import TextArea from "../../../CoreComponent/TextArea";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import { countriesOptions, nationalitiesOptions } from "../../../constant";
import "./style.scss";
import toast from "react-hot-toast";
import { Button, Container, Grid, Typography } from "@mui/material";

function PaperSubmissionForm({ conferenceId }) {
  const navigate = useNavigate();

  // State for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [filePath, setFilePath] = useState(null);
  const [error, setError] = useState({});

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("whatsapp_number", whatsApp);
    formData.append("nationality", selectedNationality.value);
    formData.append("password", password);
    formData.append("country_of_residence", country.value);
    formData.append("title", title);
    formData.append("abstract", abstract);
    formData.append("conference_id", conferenceId); // إذا كنت بحاجة إلى هذا
    formData.append("file_path", filePath); // إذا كان هناك ملف

    try {
      await axios.post(`${BaseUrl}/abstract`, formData);
      toast.success(
        "Your abstract has been successfully submitted. Thank you for your contribution!"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message)

      setError({
        form: "There was an error submitting your form. Please try again.",
      });
    }
  };

  return (
  
<Container
padding={2} >
  {/* Adding the important notes section */}

  {/* The rest of the form */}
  <form onSubmit={handleSubmit} className="register-form">

    <Grid container spacing={2} className="fields-container">
      {/* Name */}
      <Grid item xs={12} sm={6} md={4}>
        <Input
          className="input-field"
          label="Name"
          placeholder="e.g. John Doe"
          inputValue={name}
          setInputValue={setName}
          required={true}
          errorMsg={error.name}
        />
      </Grid>

      {/* Title */}
      <Grid item xs={12} sm={6} md={4}>
        <Input
          className="input-field"
          label="Title"
          placeholder="Enter Your Title"
          inputValue={title}
          setInputValue={setTitle}
          required={true}
          errorMsg={error.title}
        />
      </Grid>

      {/* Email */}
      <Grid item xs={12} sm={6} md={4}>
        <Input
          className="input-field"
          label="Email"
          placeholder="e.g. example@example.com"
          inputValue={email}
          setInputValue={setEmail}
          required={true}
          errorMsg={error.email}
        />
      </Grid>

      {/* Phone Number */}
      <Grid item xs={12} sm={6} md={4}>
        <PhoneNumberInput
          className="input-field"
          label="Phone Number"
          phone={phone}
          setPhone={setPhone}
          required={true}
          errorMsg={error.phone}
        />
        <Typography variant="body2">
          It will be used to send conference-related messages.
        </Typography>
      </Grid>

      {/* WhatsApp Number */}
      <Grid item xs={12} sm={6} md={4}>
        <PhoneNumberInput
          className="input-field"
          label="WhatsApp Number"
          phone={whatsApp}
          setPhone={setWhatsApp}
          required={true}
          errorMsg={error.whatsApp}
        />
      </Grid>

      {/* Country */}
      <Grid item xs={12} sm={6} md={4}>
        <Select
          options={countriesOptions}
          value={country}
          setValue={setCountry}
          label="Country"
          errorMsg={error.country}
        />
      </Grid>

      {/* Password */}
      <Grid item xs={12} sm={6} md={4}>
        <Input
          className="input-field"
          label="Password"
          placeholder="Your password"
          inputValue={password}
          setInputValue={setPassword}
          required={true}
          errorMsg={error.password}
          type="password"
        />
      </Grid>

      {/* Nationality */}
      <Grid item xs={12} sm={6} md={4}>
        <Select
          options={nationalitiesOptions}
          value={selectedNationality}
          setValue={setSelectedNationality}
          label="Nationality"
          errorMsg={error.nationality}
        />
      </Grid>

      {/* Abstract */}
      <Grid item xs={12}>
        <TextArea
          className="textarea-field"
          label="Abstract"
          placeholder="Enter abstract"
          value={abstract}
          setValue={setAbstract}
          required={true}
          errorMsg={error.abstract}
          rows={15}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <ImageUpload
          className="upload-field"
          label="Upload Paper File"
          inputValue={filePath}
          setInputValue={setFilePath}
          allowedExtensions={["pdf"]}
        />
      </Grid>
    </Grid>

    {/* Submit Button */}
    <Grid container justifyContent="center" className="register-btn-container">
      <Button
        variant="contained"
        className="register-btn"
        type="submit"
        fullWidth
        sx={{
          backgroundColor: "#c62828",
          color: "#ffffff",
          marginTop:'10px'

        }}
      >
        Upload
      </Button>
    </Grid>
  </form>
</Container>
  );
}

export default PaperSubmissionForm;
