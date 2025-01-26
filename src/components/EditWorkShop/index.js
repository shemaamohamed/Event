import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import httpService from "../../common/httpService";
import axios from "axios";
import "./style.scss";
import { useParams } from "react-router-dom";

const WorkShopEdit = () => {
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // لفتح/غلق نافذة الحوار
  const [currentWorkshop, setCurrentWorkshop] = useState(null); // لتخزين الورشة الحالية لتعديلها
  const [newDescription, setNewDescription] = useState(""); // لتخزين الوصف الجديد الذي سيدخل في نافذة التعديل
  const BaseUrl = process.env.REACT_APP_BASE_URL;
const {conferenceId} = useParams()
  const getWorkShop = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/workshops/${conferenceId}`, // قم بتعديل الـ ID حسب الحاجة
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,
      });

      setWork(response?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workshops:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const getAuthToken = () => localStorage.getItem("token");
    try {
      // إرسال طلب الحذف
      await axios.delete(`${BaseUrl}/workshops/${id}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });

      // تحديث البيانات بعد الحذف (إزالة العنصر المحذوف من الـ state)
      setWork((prevWork) => prevWork.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting workshop:", error);
    }
  };

  const handleEdit = (workshop) => {
    setCurrentWorkshop(workshop);
    setNewDescription(workshop.description); // تعبئة الوصف الحالي في الـ state
    setOpenDialog(true); // فتح نافذة التعديل
  };

  const handleSaveEdit = async () => {
    const getAuthToken = () => localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BaseUrl}/workshops/${currentWorkshop.id}`,
        { description: newDescription },
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );

      // تحديث البيانات في الـ state بعد التعديل
      setWork((prevWork) =>
        prevWork.map((item) =>
          item.id === currentWorkshop.id ? { ...item, description: newDescription } : item
        )
      );
      setOpenDialog(false); // إغلاق نافذة التعديل
    } catch (error) {
      console.error("Error updating workshop:", error);
    }
  };

  useEffect(() => {
    getWorkShop();
  }, [conferenceId]);

  return (
    <>
      <Grid container spacing={4} style={{ padding: "30px", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress sx={{ alignSelf: "center", marginTop: "50px" }} />
        ) : (
          work.length > 0 ? (
            work.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                    },
                    background: "#fff",
                    overflow: "hidden",
                    height: "100%",
                    position: "relative", // لتحديد المكان الصحيح لزر الحذف
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "#ff0000",
                      zIndex: 1,
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      color: "#007bff",
                      zIndex: 1,
                    }}
                    onClick={() => handleEdit(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#9B1321",
                        textAlign: "center",
                        marginBottom: "12px",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item?.title || "Workshop Title"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        color: "#666",
                        textAlign: "center",
                        padding: "0 10px",
                      }}
                    >
                      {item?.description || "No description available."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center",
              color: "#9B1321"
            ,marginTop:'10vh', width: "100%" }}>
              No workshops available.
            </Typography>
          )
        )}
      </Grid>

      <Dialog 
      maxWidth="sm" // You can adjust this value as per your needs (e.g., sm, md, lg)
      fullWidth // Ensures the dialog takes the full available width of its maxWidth
      sx={{
        margin: "0 auto", 
      }}
     
      open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
        sx={{
          color: "#9B1321",
        }}
        >Edit Workshop</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            variant="outlined"
            sx={{
              padding: "1px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkShopEdit;
