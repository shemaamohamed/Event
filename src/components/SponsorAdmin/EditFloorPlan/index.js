import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Menu, MenuItem, Typography, Button, Paper } from "@mui/material";
import { MoreVert as MoreVertIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import Select from "../../../CoreComponent/Select"; // إذا كانت لديك مكون البحث مسبقاً
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

const EditFloor = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const [allConference, setAllConference] = useState(null);

    const [conferenceId, setConferenceId] = useState(null);
    const [floorData, setFloorData] = useState({})
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editData, setEditData] = useState({
        floor_plan: null, // لحفظ ملف الـ PDF
        agreement_page: null, // لحفظ ملف الـ PDF أو الصورة
        shell_scheme_price_per_sqm: "", // لحفظ التكلفة لكل متر مربع
        space_only_stand_depth: "", // لحفظ عمق الساحة فقط
        space_only_stand_price_usd: "", // لحفظ سعر الساحة فقط بالدولار
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
            ? `${BaseUrl}/floor/plan/get/floor?conference_id=${conferenceId?.value}`
            : `${BaseUrl}/floor/plan/get/floor`;
        const token = localStorage.getItem("token")

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // تضمين التوكن في الـ Authorization Header
                },
            });
            console.log(response?.data.data);
            
            setFloorData(response?.data?.data || []);
        } catch (error) {
            toast.error("Failed to fetch data");
            console.error("Error fetching data:", error); // يمكنك إضافة هذا للتحقق من الخطأ
        }
    }
    useEffect(() => {
        fetchData();
    }, [conferenceId]);
 
    const columns = [
        {
            field: "floor_plan",
            headerName: "Floor Plan",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <a href={params.row.floor_plan} target="_blank" rel="noopener noreferrer">
                    View Floor Plan
                </a>
            ),
        },
        {
            field: "agreement_page",
            headerName: "Agreement Page",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <a href={params.row.agreement_page} target="_blank" rel="noopener noreferrer">
                    View Agreement Page
                </a>
            ),
        },
        {
            field: "shell_scheme_price_per_sqm",
            headerName: "Shell Scheme Price per sqm",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "space_only_stand_depth",
            headerName: "Stand Depth",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "space_only_stand_price_usd",
            headerName: "Stand Price (USD)",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "actions",
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
            floor_plan: null,  // يمكنك وضع القيمة الافتراضية لـ null إذا لم يكن هناك ملف
            agreement_page: null,  // نفس الشيء مع agreement_page
            shell_scheme_price_per_sqm: row.shell_scheme_price_per_sqm,
            space_only_stand_depth: row.space_only_stand_depth,
            space_only_stand_price_usd: row.space_only_stand_price_usd,
        });
        setOpenDialog(true);  // فتح نافذة التعديل
    };
    

    const handleSaveEdit = () => {
        const token = localStorage.getItem("token");
    
        // استخدام FormData لإرسال الملفات مع الحقول الأخرى
        const formData = new FormData();
        if (editData.floor_plan) {
            formData.append("floor_plan", editData.floor_plan);
        }
        if (editData.agreement_page) {
            formData.append("agreement_page", editData.agreement_page);
        }
        formData.append("shell_scheme_price_per_sqm", editData.shell_scheme_price_per_sqm);
        formData.append("space_only_stand_depth", editData.space_only_stand_depth);
        formData.append("space_only_stand_price_usd", editData.space_only_stand_price_usd);
    
        axios
            .post(`${BaseUrl}/floor/plan/edit/${selectedRow.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // نحدد النوع المناسب للـ form-data
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
            .delete(`${BaseUrl}/floor/delete/${id}`, {
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
            
            >Edit Floor Plan Table</Header>
            <Box sx={{ marginBottom: '20px' }}>


                {/* <Select
                    options={allConference || []}
                    value={conferenceId}
                    setValue={setConferenceId}
                    label="Conference Id"
                    errorMsg={""}
                /> */}
            </Box>
                <DataGrid
                    rows={floorData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    autoHeight


                />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Edit Booth Package</DialogTitle>
    <DialogContent>
        <TextField
            label="Shell Scheme Price per sqm"
            type="number"
            value={editData.shell_scheme_price_per_sqm}
            onChange={(e) => setEditData({ ...editData, shell_scheme_price_per_sqm: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Space Only Stand Depth"
            type="number"
            value={editData.space_only_stand_depth}
            onChange={(e) => setEditData({ ...editData, space_only_stand_depth: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Space Only Stand Price (USD)"
            type="number"
            value={editData.space_only_stand_price_usd}
            onChange={(e) => setEditData({ ...editData, space_only_stand_price_usd: e.target.value })}
            fullWidth
            margin="normal"
        />
        
        <input
            type="file"
            accept=".pdf"
            onChange={(e) => setEditData({ ...editData, floor_plan: e.target.files[0] })}
            style={{ marginTop: '16px' }}
        />
        <TextField
            label="Floor Plan"
            value={editData.floor_plan ? editData.floor_plan.name : ''}
            InputProps={{
                readOnly: true,
            }}
            fullWidth
            margin="normal"
        />
        
        <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => setEditData({ ...editData, agreement_page: e.target.files[0] })}
            style={{ marginTop: '16px' }}
        />
        <TextField
            label="Agreement Page"
            value={editData.agreement_page ? editData.agreement_page.name : ''}
            InputProps={{
                readOnly: true,
            }}
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

export default EditFloor;
