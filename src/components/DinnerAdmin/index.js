import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Menu, MenuItem, Typography, Button, Paper } from "@mui/material";
import { MoreVert as MoreVertIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import Select from "../../CoreComponent/Select" // إذا كانت لديك مكون البحث مسبقاً
import toast from "react-hot-toast";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { styled } from '@mui/system';

// Styling for the custom components
const Container = styled(Box)({
    margin: '30px auto',
    maxWidth: '1200px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const Header = styled(Typography)({
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
});

const ActionButton = styled(Button)({
    backgroundColor: '#2d87f0',
    color: '#fff',
    fontWeight: '600',
    padding: '6px 16px',
    '&:hover': {
        backgroundColor: '#1d66c1',
    },
    '&:disabled': {
        backgroundColor: '#bdbdbd',
    },
});

const DinnerAdmin = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const [allConference, setAllConference] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const [conferenceId, setConferenceId] = useState(null);
    const [option, setOption] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editData, setEditData] = useState({
        conference_id: null, // بدون قيمة افتراضية
        dinner_date: null, 
        restaurant_name: null,
        location: null,
        gathering_place: null,
        transportation_method: null,
        gathering_time: null,
        dinner_time: null,
        duration: null,
        dress_code: null,
        created_at: null,
        updated_at: null,
    });
    

    const [openDialog, setOpenDialog] = useState(false);  // حالة لفتح نافذة التعديل
    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const fetchData = async () => {
        const url = conferenceId
            ? `${BaseUrl}/dinners?conference_id=${conferenceId?.value}`
            : `${BaseUrl}/dinners`;

        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // تضمين التوكن في الـ Authorization Header
                },
            });
            setOption(response.data.dinners || []); // استبدال 'boothCosts' بـ 'sponsorshipOptions'
        console.log(response);
        
        } catch (error) {
            toast.error("Failed to fetch data");
            console.error("Error fetching data:", error); // يمكنك إضافة هذا للتحقق من الخطأ
        }
    };

    useEffect(() => {
        fetchData();
    }, [conferenceId]);

    const columns = [
        {
            field: "conference_id", // تغيير الحقل إلى 'conference_id'
            headerName: "Conference ID", // تغيير العنوان إلى "Conference ID"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "dinner_date", // تغيير الحقل إلى 'dinner_date'
            headerName: "Dinner Date", // تغيير العنوان إلى "Dinner Date"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "restaurant_name", // تغيير الحقل إلى 'restaurant_name'
            headerName: "Restaurant Name", // تغيير العنوان إلى "Restaurant Name"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "location", // تغيير الحقل إلى 'location'
            headerName: "Location", // تغيير العنوان إلى "Location"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "gathering_place", // تغيير الحقل إلى 'gathering_place'
            headerName: "Gathering Place", // تغيير العنوان إلى "Gathering Place"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "transportation_method", // تغيير الحقل إلى 'transportation_method'
            headerName: "Transportation Method", // تغيير العنوان إلى "Transportation Method"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "gathering_time", // تغيير الحقل إلى 'gathering_time'
            headerName: "Gathering Time", // تغيير العنوان إلى "Gathering Time"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "dinner_time", // تغيير الحقل إلى 'dinner_time'
            headerName: "Dinner Time", // تغيير العنوان إلى "Dinner Time"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "duration", // تغيير الحقل إلى 'duration'
            headerName: "Duration", // تغيير العنوان إلى "Duration"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "dress_code", // تغيير الحقل إلى 'dress_code'
            headerName: "Dress Code", // تغيير العنوان إلى "Dress Code"
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "actions", // هذا الحقل يبقى كما هو للتعامل مع الإجراءات
            headerName: "Actions",
            flex: 0.2,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedRow?.id === params.row.id}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleEdit(params.row)}>
                            <EditIcon sx={{ marginRight: 1 }} /> Edit
                        </MenuItem>
    
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon sx={{ marginRight: 1 }} /> Delete
                        </MenuItem>
                    </Menu>
                </>
            ),
        },
    ];
    

    const handleEdit = (row) => {
        // ملء الحقول بالقيم الحالية من السطر المحدد
        setEditData({
            title: row.title || "", // Optional field
            description: row.description || "", // Optional field
            price: row.price || "", // Optional field
        });
        setOpenDialog(true);  // فتح نافذة التعديل
    };

    const handleSaveEdit = () => {
        const token = localStorage.getItem("token");

        axios
            .put(`${BaseUrl}/dinners/${selectedRow.id}`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success("Updated successfully");
                setOpenDialog(false); // إغلاق نافذة التعديل
                fetchData(); // إعادة جلب البيانات بعد التحديث
            })
            .catch((error) => {
                toast.error("Failed to update");
                console.error("Error updating:", error);
            });
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem("token"); // جلب التوكن من Local Storage

        axios
            .delete(`${BaseUrl}/dinner-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // تمرير التوكن في الـ Authorization header
                },
            })
            .then((response) => {
                toast.success("Deleted successfully");
                fetchData(); // إعادة جلب البيانات بعد الحذف
            })
            .catch((error) => {
                toast.error("Failed to delete");
                console.error("Error deleting:", error); // طباعة الخطأ في الكونسول لتسهيل تتبعه
            });
    };


    const getConference = () => {
        const url = `${BaseUrl}/conferences/all`;
        axios
            .get(url)
            .then((response) => {
                setAllConference(
                    response?.data?.data?.map((item) => {
                        return { label: item?.title, value: item?.id };
                    })
                );
            })
            .catch((error) => { });
    };
    useEffect(() => {
        getConference();
    }, []);  // هذه السطر يضمن أن دالة getConference تُستدعى عند أول تحميل للمكون.

    return (
        <div
        style={{
            padding:'20px'
        }}
        >
            <Header
            sx={{
                color:' #c62828'
            }}
            
            > Dinner</Header>
            <Box sx={{ marginBottom: '20px' }}>


                <Select
                    options={allConference || []}
                    value={conferenceId}
                    setValue={setConferenceId}
                    label="Conference Id"
                    errorMsg={""}
                />
            </Box>
                <DataGrid
                    rows={option}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    autoHeight


                />
           <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Edit Dinner Information</DialogTitle>
    <DialogContent>
   
        <TextField
            label="Dinner Date"
            value={editData.dinner_date || ""}
            onChange={(e) => setEditData({ ...editData, dinner_date: e.target.value })}
            fullWidth
            margin="normal"
            type="date"
        />
        <TextField
            label="Restaurant Name"
            value={editData.restaurant_name || ""}
            onChange={(e) => setEditData({ ...editData, restaurant_name: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Location"
            value={editData.location || ""}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Gathering Place"
            value={editData.gathering_place || ""}
            onChange={(e) => setEditData({ ...editData, gathering_place: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Transportation Method"
            value={editData.transportation_method || ""}
            onChange={(e) => setEditData({ ...editData, transportation_method: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Gathering Time"
            value={editData.gathering_time || ""}
            onChange={(e) => setEditData({ ...editData, gathering_time: e.target.value })}
            fullWidth
            margin="normal"
            type="time"
        />
        <TextField
            label="Dinner Time"
            value={editData.dinner_time || ""}
            onChange={(e) => setEditData({ ...editData, dinner_time: e.target.value })}
            fullWidth
            margin="normal"
            type="time"
        />
        <TextField
            label="Duration"
            value={editData.duration || ""}
            onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
            fullWidth
            margin="normal"
            type="number"
        />
        <TextField
            label="Dress Code"
            value={editData.dress_code || ""}
            onChange={(e) => setEditData({ ...editData, dress_code: e.target.value })}
            fullWidth
            margin="normal"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
        <Button onClick={handleSaveEdit} color="primary">Save</Button>
    </DialogActions>
</Dialog>


        </div>

    );
};

export default DinnerAdmin;
