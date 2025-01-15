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

const Sponsorships = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const [allConference, setAllConference] = useState(null);

    const [conferenceId, setConferenceId] = useState(null);
    const [sponsorships, setSponsorships] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editData, setEditData] = useState({
        item: "",  // اسم العنصر (مثل "أو الباقة")
        price: "",  // السعر
        max_sponsors: "",  // العدد الأقصى للراعين
        booth_size: "",  // حجم الكشك
        booklet_ad: "",  // الإعلان في الكتيب
        website_ad: "",  // الإعلان على الموقع
        bags_inserts: "",  // محتويات الحقائب
        backdrop_logo: "",  // شعار الخلفية
        non_residential_reg: "",  // عدد التسجيلات غير السكنية
        residential_reg: "",  // عدد التسجيلات السكنية
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
            ? `${BaseUrl}/package/table/admin?conference_id=${conferenceId?.value}`
            : `${BaseUrl}/package/table/admin`;
        const token = localStorage.getItem("token")

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // تضمين التوكن في الـ Authorization Header
                },
            });
            setSponsorships(response.data.sponsorships || []);
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
            field: "item", // تعديل الحقل إلى 'item'
            headerName: "Item",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "price", // تعديل الحقل إلى 'price'
            headerName: "Price",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "max_sponsors", // تعديل الحقل إلى 'max_sponsors'
            headerName: "Max Sponsors",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "booth_size", // تعديل الحقل إلى 'booth_size'
            headerName: "Booth Size",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "booklet_ad", // تعديل الحقل إلى 'booklet_ad'
            headerName: "Booklet Ad",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "website_ad", // تعديل الحقل إلى 'website_ad'
            headerName: "Website Ad",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "bags_inserts", // تعديل الحقل إلى 'bags_inserts'
            headerName: "Bags Inserts",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "backdrop_logo", // تعديل الحقل إلى 'backdrop_logo'
            headerName: "Backdrop Logo",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "non_residential_reg", // تعديل الحقل إلى 'non_residential_reg'
            headerName: "Non-Residential Reg",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "residential_reg", // تعديل الحقل إلى 'residential_reg'
            headerName: "Residential Reg",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "video_show_between_sessions", // تعديل الحقل إلى 'residential_reg'
            headerName: "Video Show Between Sessions",
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
            item: row.item,
            price: row.price,
            max_sponsors: row.max_sponsors,
            booth_size: row.booth_size,
            booklet_ad: row.booklet_ad,
            website_ad: row.website_ad,
            bags_inserts: row.bags_inserts,
            backdrop_logo: row.backdrop_logo,
            non_residential_reg: row.non_residential_reg,
            residential_reg: row.residential_reg,
        });
        setOpenDialog(true);  // فتح نافذة التعديل
    };
    
    const handleSaveEdit = () => {
        const token = localStorage.getItem("token");
    
        // تحديث URL بما يتناسب مع الـ API الجديد
        axios
            .put(`${BaseUrl}/package/table/edit/${selectedRow.id}`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success("Updated successfully");
                setOpenDialog(false);  // إغلاق نافذة التعديل
                fetchData();  // إعادة جلب البيانات بعد التحديث
            })
            .catch((error) => {
                toast.error("Failed to update");
                console.error("Error updating:", error);
            });
    };
    
    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
    
        // تحديث URL بما يتناسب مع الـ API الجديد
        axios
            .delete(`${BaseUrl}/package/table/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success("Deleted successfully");
                fetchData();  // إعادة جلب البيانات بعد الحذف
            })
            .catch((error) => {
                toast.error("Failed to delete");
                console.error("Error deleting:", error);  // طباعة الخطأ في الكونسول لتسهيل تتبعه
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
            >Conference Sizes</Header>
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
                    rows={sponsorships}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    autoHeight


                />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Edit Package</DialogTitle>
    <DialogContent>
        <TextField
            label="Item"
            value={editData.item}
            onChange={(e) => setEditData({ ...editData, item: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Price"
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Max Sponsors"
            type="number"
            value={editData.max_sponsors}
            onChange={(e) => setEditData({ ...editData, max_sponsors: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Booth Size"
            value={editData.booth_size}
            onChange={(e) => setEditData({ ...editData, booth_size: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Booklet Ad"
            value={editData.booklet_ad}
            onChange={(e) => setEditData({ ...editData, booklet_ad: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Website Ad"
            value={editData.website_ad}
            onChange={(e) => setEditData({ ...editData, website_ad: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Bags Inserts"
            value={editData.bags_inserts}
            onChange={(e) => setEditData({ ...editData, bags_inserts: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Backdrop Logo"
            value={editData.backdrop_logo}
            onChange={(e) => setEditData({ ...editData, backdrop_logo: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Non-Residential Reg"
            type="number"
            value={editData.non_residential_reg}
            onChange={(e) => setEditData({ ...editData, non_residential_reg: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Residential Reg"
            type="number"
            value={editData.residential_reg}
            onChange={(e) => setEditData({ ...editData, residential_reg: e.target.value })}
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

export default Sponsorships;
