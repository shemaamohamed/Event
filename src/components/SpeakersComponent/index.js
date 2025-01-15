import React, { useState, useEffect, Fragment } from "react";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import ImageUpload from "../../CoreComponent/ImageUpload";
import { backendUrlImages } from "../../constant/config";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const SpeakersComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userIdForUpload, setUserIdForUpload] = useState(0);
  const [file, setFile] = useState(null);

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch speakers data
  const fetchSpeakers = async (page = 1) => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/speakers`,
        params: { page },
        headers: { Authorization: `Bearer ${token}` },
        onSuccess: (data) => {
          setUsersData(data.speakers || []);
          setTotalPages(data?.totalPages || 1);
          console.log(data?.currentPage);

          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch speakers."),
        withToast: true,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch speakers.");
    }
  };

  const handlePageChange = (page) => {
    fetchSpeakers(page);
  };

  const handleUploadClick = (user) => {
    setUserIdForUpload(user.id);
    setDialogOpen(true);
  };

  const rows = usersData.map((user) => ({
    ...user,
    name: user?.user?.name,
        email: user?.user?.email,

        biography: user?.user?.biography,
    image: user?.user?.image,

    abstract: user.abstract,
    presentation_file: user.presentation_file ,
    video: user.video ,
    topics: user.topics,
    online_participation: user.online_participation ? "Yes" : "No",
    is_online_approved: user.is_online_approved ? "Yes" : "No",
    accommodation_status: user.accommodation_status ? "Booked" : "Not Booked",
    ticket_status: user.ticket_status ? "Approved" : "Rejected",
    dinner_invitation: user.dinner_invitation ? "Yes" : "No",
    airport_pickup: user.airport_pickup ? "Yes" : "No",
    free_trip: user.free_trip ? "Yes" : "No",
  }));
  const column= [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "biography",
      headerName: "Biography",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => {
        const imageUrl = 
          `${backendUrlImages}${params.row.image}`
          // Placeholder if no image is available
        return (
          <div style={{ textAlign: "center" }}>
            <a href={imageUrl} download={params.row.image ? params.row.image : null}>
              <img
                src={imageUrl}
                alt={params.row.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover", // Makes sure the image fits the circle
                }}
              />
            </a>
          </div>
        );
      },
    },
    {
      field: "abstract",
      headerName: "Abstract",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        params.row.abstract ? (
          <a
            href={`${backendUrlImages}${params.row.abstract}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Abstract
          </a>
        ) : (
          "No Abstract"
        )
      ),
    },
    {
      field: "presentation_file",
      headerName: "Presentation File",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        params.row.presentation_file ? (
          <a
            href={`${backendUrlImages}${params.row.presentation_file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
          View Presentation
          </a>
        ) : (
          "No Presentation"

        )
      ),
      
    },
    {
      field: "video",
      headerName: "Video",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        params.row.video ? (
          <a
            href={`${backendUrlImages}${params.row.video}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Video
          </a>
        ) : (
          "No Video"
        )
      
      ),  
    },
    {
      field: "topics",
      headerName: "Topics",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        params.row.topics ? (
          <div>
            {JSON.parse(params.row.topics).join(", ")}
          </div>
        ) : (
          "No Topics"
        )
      ),
    },
    
    {
      field: "online_participation",
      headerName: "Online Participation",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "is_online_approved",
      headerName: "Allowed Online",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "accommodation_status",
      headerName: "Accommodation Status",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "ticket_status",
      headerName: "Visa Status",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "dinner_invitation",
      headerName: "Have Dinner Invitation",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "airport_pickup",
      headerName: "Free Airport Pickup",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "free_trip",
      headerName: "Free Trip",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
  ];

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("certificatePDF", file);

    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/users/${userIdForUpload}/certificate`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        onSuccess: () => {
          toast.success("File uploaded successfully!");
          fetchSpeakers(); // Refresh the list after file upload
        },
        onError: (error) => console.error("Failed to upload file:", error),
      });
    } catch (error) {
      console.error("Failed to upload file:", error);
    }

    setDialogOpen(false);
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  return (
    <div
    style={{
      borderRadius: '8px',
      width: '100%',
      maxWidth: '1700px',
      // height: 'calc(100vh - 80px)',
      padding: '20px',
    }}
    
    >
      <Typography
              variant="h6"
              sx={{
                color: '#c62828',
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              All Speakers
            </Typography>
       <DataGrid
          rows={rows}
          columns={column}
          getRowId={(row) => row.email}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[7]}
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
            header="Upload Certificate File"
            open={isDialogOpen}
            setOpen={setDialogOpen}
            className="dialog-file"
          >
            <div className="dialog-content">
              <ImageUpload
                required
                label="Certificate File"
                allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
                inputValue={file}
                setInputValue={setFile}
                className="image-upload"
                placeholder="Choose a file"
              />
              <div className="dialog-actions">
                <button className="save-button" onClick={handleFileUpload}>
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

export default SpeakersComponent;
