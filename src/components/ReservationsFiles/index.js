import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import Dialog from "../../CoreComponent/Dialog";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const ReservationsFiles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const openMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

 

  const handleUploadClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const getData = () => {
    // الحصول على التوكن من الـ localStorage أو من الـ context أو من أي مصدر آخر
    const token = localStorage.getItem("token"); // إذا كنت تخزن التوكن في الـ localStorage

    if (token) {
      axios
        .get(`${BaseUrl}/reservation/approved`, {
          headers: {
            Authorization: `Bearer ${token}`, // تمرير التوكن مع الهيدر
          },
        })
        .then((response) => {
          // إذا تم الحصول على البيانات بنجاح
          setData(response?.data?.invoices); // تحديث الحالة بالبيانات المستلمة من الـ API
        })
        .catch((error) => {
          // التعامل مع الأخطاء
          console.error("There was an error fetching the data: ", error);
        });
    } else {
      console.error("Token is missing or expired.");
    }
  };
  const handleSubmit = (id) => {
    // الحصول على التوكن من الـ localStorage أو من الـ context أو من أي مصدر آخر
    const token = localStorage.getItem("token"); // إذا كنت تخزن التوكن في الـ localStorage

    if (token) {
      // إعداد FormData لتحميل الملف
      const formData = new FormData();

      if (file) {
        formData.append("confirmationPDF", file);

        // إرسال طلب POST لتحميل الملف
        axios
          .post(`${BaseUrl}/add/confirmation/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // التعامل مع الاستجابة الناجحة
            console.log("File uploaded successfully:", response.data);
            toast.success("File uploaded successfully:");
            getData();
            setDialogOpen(false); // إغلاق الـ dialog بعد النجاح
          })
          .catch((error) => {
            // التعامل مع الأخطاء
            console.error("There was an error uploading the file: ", error);
          });
      } else {
        console.error("No file selected.");
      }
    } else {
      console.error("Token is missing or expired.");
    }
  };

  const rows = data?.map((row) => ({
    ...row,
    name: row?.room?.occupant_name,
    
  }));
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "name",
      headerName: "User Name",
      width: 200,
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => openMenu(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRow?.id === params.row.id}
            onClose={closeMenu}
          >
            <MenuItem
              onClick={() => {
                handleUploadClick(params.row);
                setId(params.row.id);
              }}
            >
        Upload Confirmation File


            </MenuItem>
          </Menu>
        </>
      ),

    },
  ];

  return (
    <div className="flights-files-container">
      <h1 className="visa-files"
      style={{
        color:'#9B1321',
      }}
      >Reservations Files</h1>
       <DataGrid
                          rows={rows}
                          columns={columns}
                          getRowId={(row) => row.id}
            
                          getRowHeight={() => "auto"}
            
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          checkboxSelection
                          disableRowSelectionOnClick
                          autoHeight
                          sx={{
                            marginTop: "20px",
                            "& .MuiDataGrid-virtualScroller": {
                              overflow: "hidden", // لإزالة أي تمرير غير مرغوب فيه
                            },
                          }}
                        />
      

      {isDialogOpen && (
        <Dialog
          viewHeader={true}
          header={`Upload Hotel Booking Confirmation File `}
          open={isDialogOpen}
          setOpen={setDialogOpen}
        >
          <div className="dialog-content-files">
            <div className="file-con">
              <ImageUpload
                required
                label="Confirmation File"
                allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
                inputValue={file}
                setInputValue={setFile}
                className="image-upload"
                placeholder="Choose a file"
              />
            </div>

            <div className="buttons-file">
              <button className="save-button" onClick={() => handleSubmit(id)}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ReservationsFiles;
