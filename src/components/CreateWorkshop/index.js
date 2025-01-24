import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateWorkshop = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL; // يمكن تغيير الرابط حسب البيئة
    const [allConferences, setAllConferences] = useState([]);
    const [description, setDescription] = useState("");
    const [conferenceId, setConferenceId] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    // جلب جميع المؤتمرات لاختيار "conference_id"
    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const token = localStorage.getItem("token"); // الحصول على التوكن من LocalStorage
                const response = await axios.get(`${BaseUrl}/conferences/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllConferences(response?.data?.data || []);
            } catch (error) {
                toast.error("Failed to fetch conferences");
                console.error("Error fetching conferences:", error);
            }
        };
        fetchConferences();
    }, []);

    // دالة لإنشاء ورشة عمل
    const handleCreateWorkshop = async () => {
        if (!description || !conferenceId) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // الحصول على التوكن من LocalStorage

            const response = await axios.post(
                `${BaseUrl}/workshops`,
                { description, conference_id: conferenceId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Workshop created successfully!");
            setOpenDialog(false); // إغلاق نافذة الحوار بعد إنشاء ورشة العمل
        } catch (error) {
            toast.error("Failed to create workshop.");
            console.error("Error creating workshop:", error);
        }
    };

    return (
        <div style={{ padding: "20px" ,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
         }} >
            <Typography variant="h5" textAlign={'center'} gutterBottom>
                Create New Workshop
            </Typography>

            <Button variant="contained"
             sx={{
                backgroundColor:"#9B1321"
            }}
            onClick={() => setOpenDialog(true)}>
                Add Workshop
            </Button>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Create Workshop</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="conference-select-label">Select Conference</InputLabel>
                        <Select
                            labelId="conference-select-label"
                            value={conferenceId}
                            onChange={(e) => setConferenceId(e.target.value)}
                            label="Select Conference"
                        >
                            {allConferences.map((conference) => (
                                <MenuItem key={conference.id} value={conference.id}>
                                    {conference.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Workshop Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateWorkshop} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateWorkshop;
