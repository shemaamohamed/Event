import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import Dialog from "../../CoreComponent/Dialog";
import ImageUpload from "../../CoreComponent/ImageUpload";
import axios from "axios";
import "./style.scss";
import toast from "react-hot-toast";
import httpService from "../../common/httpService";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";



const FlightsFiles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
  
  // Mock data for the table
    const [isOpen, setIsOpen] = useState(false);
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
    const token = localStorage.getItem("token");

    axios
      .get(`${BaseUrl}/pay/approved`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Response:", response);
        setData(
          response?.data?.approved_invoices.map((item) => {
            return {
              id: item?.invoice_id,
              name: item.user?.name || "",
              email: item.user?.email || "",
              status: item.status,
            };
          })
        ); // تخزين البيانات في الحالة (state)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async () => {
    // post api to upload fil
    const formData = new FormData();
    formData.append("ticketPDF", file);
    const authToken = localStorage.getItem("token");
    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/add/ticket/${id}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withToast: true,
        data: formData,
        onSuccess: async (response) => {
          console.log(response);
          toast.success("File uploaded successfully!");
        },
        onError: (error) => console.error("Failed to fetch user data:", error),
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
    // setData();

    setDialogOpen(false);
  };
  const rows = data.map((row) => ({
    ...row,
    
  }));
  const columns=[
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },{
      field: "name",
      headerName: "User Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },{
      field: "status",
      headerName: "Flight Status",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },{
      field: "actions",
      headerName: "Actions",
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
                      Upload Flight Ticket

            </MenuItem>
          </Menu>
        </>
      ),

    }
    
  ]
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flights-files-container">
      <h1 className="visa-files" style={{
        color:'#9B1321'
      }}>Flights Files</h1>
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
          header={`Upload Ticket File `}
          open={isDialogOpen}
          setOpen={setDialogOpen}
        >
          <div className="dialog-content-files">
            <div className="file-con">
              <ImageUpload
                required
                label="Visa File"
                allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
                inputValue={file}
                setInputValue={setFile}
                className="image-upload"
                placeholder="Choose a file"
              />
            </div>

            <div className="buttons-file">
              <button className="save-button" onClick={() => handleSubmit()}>
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

export default FlightsFiles;
