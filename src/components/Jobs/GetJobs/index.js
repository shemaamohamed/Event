import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss"; // إضافة ملف التنسيق
import { Input } from "antd";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import { Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material";


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [positionAppliedFor, setPositionAppliedFor] = useState("");
  const [educationalQualification, setEducationalQualification] = useState("");
  const [resume, setResume] = useState("");
  const [activeJobId, setActiveJobId] = useState(null); // حالة الوظيفة النشطة
  const [submittedJobs, setSubmittedJobs] = useState({}); // حالة الوظائف التي تم تقديم طلب لها
  const BaseUrl = process.env.REACT_APP_BASE_URL;;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/all/job`);
        setJobs(response.data.jobs); // تعيين البيانات في الحالة
        console.log(response.data.jobs);
      } catch (error) {
        setError(
          "Error fetching jobs: " +
            (error.response?.data?.message || error.message)
        );
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = async (id) => {
    // إعداد البيانات لإرسالها إلى الواجهة الخلفية
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    formData.append("whatsapp_number", whatsappNumber);
    formData.append("email", email);
    formData.append("nationality", nationality);
    formData.append("home_address", homeAddress);
    formData.append("position_applied_for", positionAppliedFor);
    formData.append("educational_qualification", educationalQualification);
    
    if (resume) {
      formData.append("resume", resume); // إضافة السيرة الذاتية إذا كانت موجودة
    }
    
    formData.append("job_id", id); // إضافة معرف الوظيفة

    // إرسال البيانات إلى API
    try {
      const response = await axios.post(`${BaseUrl}/applicants`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // التعامل مع الاستجابة
      setSubmittedJobs((prev) => ({
        ...prev,
        [id]: true, // تعيين حالة الوظيفة التي تم تقديم الطلب لها
      }));
    } catch (error) {
      console.error("Error submitting application:", error);
      alert('Error submitting application: ' + (error.response?.data?.message || error.message)); // إشعار بالخطأ
    }
  };

  const handleFormSubmit = (e, jobId) => {
    e.preventDefault();
    console.log("Submitting application for job ID:", jobId, "with data:");
    handleSubmit(jobId); // استدعاء handleSubmit لإرسال البيانات
  };

  return (
    <div style={{ padding: "20px", marginTop: "15vh" }}>
    <Typography variant="h4" align="center" gutterBottom>
      Available Jobs
    </Typography>
    {error && (
      <Typography variant="body1" color="error" align="center">
        {error}
      </Typography>
    )}
    <Grid container spacing={3} justifyContent="center">
      {jobs.map((job) => (
        <Grid item key={job.id} xs={12} sm={6} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {job.events_coordinator}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Responsibilities:</strong> {job.responsibilities}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Description:</strong> {job.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                style={{
                  color:'white',
                  backgroundColor:'#9B1321'
                }}
                fullWidth
                onClick={() => setActiveJobId(job.id)}
              >
                Apply
              </Button>
            </CardActions>

            {activeJobId === job.id && !submittedJobs[job.id] && (
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Apply for Job
                </Typography>
                <form onSubmit={(e) => handleFormSubmit(e, job.id)}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input
        type="text"
        name="whatsapp_number"
        placeholder="WhatsApp Number"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        It will be used to send conference-related messages.
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input
        type="text"
        name="nationality"
        placeholder="Nationality"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Input
        type="text"
        name="home_address"
        placeholder="Home Address"
        value={homeAddress}
        onChange={(e) => setHomeAddress(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <Input
        type="text"
        name="educational_qualification"
        placeholder="Educational Qualification"
        value={educationalQualification}
        onChange={(e) => setEducationalQualification(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <Input
        type="text"
        name="position_applied_for"
        placeholder="Position Applied For"
        value={positionAppliedFor}
        onChange={(e) => setPositionAppliedFor(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <ImageUpload
        label="Upload Resume"
        inputValue={resume}
        setInputValue={setResume}
        allowedExtensions={["pdf"]}
      />
    </Grid>
    <Grid item xs={12}>
      <Button type="submit" variant="contained" color="success" fullWidth>
        Submit Application
      </Button>
    </Grid>
  </Grid>
</form>

              </CardContent>
            )}

            {submittedJobs[job.id] && activeJobId === job.id && (
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Thank you for submitting your application!
                </Typography>
                <Typography variant="body2">
                  We appreciate your interest in joining our team. Your qualifications are
                  currently under review, and we will contact you soon if your profile matches
                  the job requirements.
                </Typography>
                <Typography variant="body2">We wish you the best of luck!</Typography>
                <Typography variant="body2" gutterBottom>
                  Sincerely, Events Consultant Company
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  );
};

export default JobList;
