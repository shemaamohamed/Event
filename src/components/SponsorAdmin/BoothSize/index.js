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

const Size = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const [allConference, setAllConference] = useState(null);

    const [conferenceId, setConferenceId] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editData, setEditData] = useState({
        size: "",
        cost: "",
        lunch_invitations: "",
        name_tags: "",
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
            ? `${BaseUrl}/size/table/get?conference_id=${conferenceId?.value}`
            : `${BaseUrl}/size/table/get`;
        const token = localStorage.getItem("token")

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // تضمين التوكن في الـ Authorization Header
                },
            });
            setSizes(response.data.boothCosts || []);
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
            field: "size",
            headerName: "Size",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "lunch_invitations",
            headerName: "Lunch Invitations",
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "name_tags",
            headerName: "Name Tags",
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
            size: row.size,
            cost: row.cost,
            lunch_invitations: row.lunch_invitations,
            name_tags: row.name_tags,
        });
        setOpenDialog(true);  // فتح نافذة التعديل
    };

    const handleSaveEdit = () => {
        const token = localStorage.getItem("token");

        axios
            .put(`${BaseUrl}/size/edit/${selectedRow.id}`, editData, {
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
            .delete(`${BaseUrl}/size/delete/row/${id}`, {
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
            >Edit Booth Cost Table</Header>
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
                    rows={sizes}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    autoHeight


                />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Booth Cost</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Size"
                        value={editData.size}
                        onChange={(e) => setEditData({ ...editData, size: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cost"
                        type="number"
                        value={editData.cost}
                        onChange={(e) => setEditData({ ...editData, cost: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Lunch Invitations"
                        type="number"
                        value={editData.lunch_invitations}
                        onChange={(e) => setEditData({ ...editData, lunch_invitations: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Name Tags"
                        type="number"
                        value={editData.name_tags}
                        onChange={(e) => setEditData({ ...editData, name_tags: e.target.value })}
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

export default Size;
