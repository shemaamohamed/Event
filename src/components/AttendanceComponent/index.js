import React, { useState, useEffect, Fragment } from "react";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import ImageUpload from "../../CoreComponent/ImageUpload";
import { backendUrlImages } from "../../constant/config";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Select from "../../CoreComponent/Select";

const AttendanceComponent = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [attendanceIdForUpload, setAttendanceIdForUpload] = useState(0);
  const [file, setFile] = useState(null);
  const [conferences, setConferences] = useState([]);
  const [conferenceId, setConferenceId] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch attendance data
  const fetchAttendances = async (page = 1) => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/attendances/all`,
        params: { page, conference_id: conferenceId?.value || null },
        headers: { Authorization: `Bearer ${token}` },
        onSuccess: (data) => {
          setAttendanceData(data.attendance || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch attendance records."),
        withToast: true,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch attendance records.");
    }
  };

  const handlePageChange = (page) => {
    fetchAttendances(page);
  };

  const handleUploadClick = (attendance) => {
    setAttendanceIdForUpload(attendance.id);
    setDialogOpen(true);
  };

  const row = attendanceData.map((attendance) => ({
    ...attendance,
    attendee_name: attendance?.user?.name,
    email: attendance?.user?.email,
    conference_title: attendance?.conference?.title,
    registration_fee: attendance.registration_fee,
    conference_bag: attendance.includes_conference_bag ? "Yes" : "No",
    conference_badge: attendance.includes_conference_badge ? "Yes" : "No",
    conference_book: attendance.includes_conference_book ? "Yes" : "No",
    certificate: attendance.includes_certificate ? "Yes" : "No",
    lecture_attendance: attendance.includes_lecture_attendance ? "Yes" : "No",
  }));
  const columns = [
    {
      field: "attendee_name",
      headerName: "Attendee Name",
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
      field: "conference_title",
      headerName: "Conference Title",
      flex: 1,
      minWidth: 300,
      cellClassName: "centered-cell",
    },
    {
      field: "registration_fee",
      headerName: "Registration Fee",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "conference_bag",
      headerName: "Conference Bag",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "conference_badge",
      headerName: "Conference Badge",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "conference_book",
      headerName: "Conference Book",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "certificate",
      headerName: "Certificate",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "lecture_attendance",
      headerName: "Lecture Attendance",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
  ];
  const fetchConferences = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/conferences/all`,
        onSuccess: (data) => {
          setConferences(data.data); // تأكد من أنك تحفظ البيانات بشكل صحيح
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch conferences."),
      });
    } catch (error) {
      setErrorMsg("Failed to fetch conferences.");
    }
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("certificatePDF", file);

    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/attendances/${attendanceIdForUpload}/certificate`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        onSuccess: () => {
          toast.success("File uploaded successfully!");
          fetchAttendances(); // Refresh the list after file upload
        },
        onError: (error) => console.error("Failed to upload file:", error),
      });
    } catch (error) {
      console.error("Failed to upload file:", error);
    }

    setDialogOpen(false);
  };
  useEffect(() => {
    fetchConferences();
  }, []);
  useEffect(() => {
    fetchAttendances();
  }, [conferenceId]);

  return (
    <div
      style={{
        borderRadius: "8px",
        width: "100%",
        maxWidth: "1700px",
        // height: 'calc(100vh - 80px)',
        padding: "20px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#c62828",
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          textAlign: "center",
        }}
      >
        All Attendances
      </Typography>
      <Select
        label="Select Conference"
        options={conferences.map((item) => ({
          label: item.title,
          value: item.id,
        }))}
        value={conferenceId}
        setValue={setConferenceId}
      />
      <DataGrid
        getRowId={(row) => row.email}
        rows={row}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
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

export default AttendanceComponent;
