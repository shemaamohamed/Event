import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import { backendUrlImages } from "../../constant/config";

const AttendanceComponent = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [attendanceIdForUpload, setAttendanceIdForUpload] = useState(0);
  const [file, setFile] = useState(null);

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch attendance data
  const fetchAttendances = async (page = 1) => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/attendances/all`,
        params: { page },
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

  const tableData = attendanceData.map((attendance) => ({
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
    fetchAttendances();
  }, []);

  return (
    <Fragment>
      <div className="attendance-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table
              headers={[
                { label: "Attendee Name", key: "attendee_name" },
                { label: "Email", key: "email" },
                { label: "Conference Title", key: "conference_title" },
                { label: "Registration Fee", key: "registration_fee" },
                { label: "Conference Bag", key: "conference_bag" },
                { label: "Conference Badge", key: "conference_badge" },
                { label: "Conference Book", key: "conference_book" },
                { label: "Certificate", key: "certificate" },
                { label: "Lecture Attendance", key: "lecture_attendance" },
              ]}
              data={tableData}
            />
          </div>
        </div>

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

        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AttendanceComponent;
