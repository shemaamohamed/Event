import React, { useState, useEffect } from "react";
import Select from "../../CoreComponent/Select";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import { toast } from "react-toastify";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import { backendUrlImages } from "../../constant/config";

const CertificateComponent = () => {
  // State variables to manage component state
  const [conferenceId, setConferenceId] = useState(null);
  const [registrationType, setRegistrationType] = useState("speaker");
  const [usersData, setUsersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [conferences, setConferences] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userIdForUpload, setUserIdForUpload] = useState(0);
  const [file, setFile] = useState(null);

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  const registrationTypes = [
    { label: "Speaker", value: "speaker" },
    { label: "Attendance", value: "attendance" },
  ];

  const fetchConferences = async () => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/con/upcoming`,
        onSuccess: (data) => {
          const conferenceOptions =
            data?.upcoming_conferences?.map((item) => ({
              label: item?.title,
              value: item?.id,
            })) || [];
          setConferences(conferenceOptions);
        //   setConferenceId(conferenceOptions[0]?.value);
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch conferences."),
        withToast: false,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch conferences.");
    }
  };

  // Function to fetch users based on the selected conference and registration type
  const fetchUsers = async (conferenceId, registrationType, page = 1) => {
    // if (!conferenceId) {
    //   setErrorMsg("Please select a conference.");
    //   return;
    // }

    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/users/speaker-att/${
          conferenceId ? conferenceId : ""
        }/${registrationType ? registrationType : ""}`,
        params: { page },
        headers: { Authorization: `Bearer ${token}` },
        onSuccess: (data) => {
          setUsersData(data.users || []);
          setTotalPages(data.totalPages || 1);
          setCurrentPage(data.currentPage || 1);
        },
        onError: (error) =>
          setErrorMsg(error?.message || "Failed to fetch users."),
        withToast: true,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch users.");
    }
  };

  const handleFilterChange = () => {
    if (conferenceId) {
      fetchUsers(conferenceId, registrationType, 1); // Fetch users for the selected filters
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(conferenceId, registrationType, page);
  };

  const handleUploadClick = (user) => {
    setUserIdForUpload(user.id);
    setDialogOpen(true);
  };

  const tableData = usersData.map((user) => ({
    ...user,
    certificatePDF: user.certificatePDF ? (
      user.certificatePDF.includes("image") ? (
        <img
          src={`${backendUrlImages}${user.certificatePDF}`}
          alt="Certificate"
          style={{ width: "100px", height: "100px" }}
        />
      ) : (
        <a
          href={`${backendUrlImages}${user.certificatePDF}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View File
        </a>
      )
    ) : (
      "No Certificate"
    ),
    actions: (
      <button className="upload-button" onClick={() => handleUploadClick(user)}>
        Upload Certificate
      </button>
    ),
  }));

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
          fetchUsers();
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

  return (
    <div className="certificate-component">
      {/* Filters Section */}
      <div className="filters">
        <Select
          label="Select Conference"
          options={conferences}
          value={conferences.find((item) => item?.value === conferenceId)}
          setValue={(option) => {
            setConferenceId(option.value);
            fetchUsers(option.value, registrationType, 1);
          }}
          //   errorMsg={errorMsg}
        />

        <Select
          label="Select Registration Type"
          options={registrationTypes}
          value={registrationTypes.find(
            (item) => item?.value === registrationType
          )}
          setValue={(option) => {
            setRegistrationType(option.value);
            fetchUsers(conferenceId, option.value, 1);
          }}
          //   errorMsg={errorMsg}
        />
      </div>

      {/* Users Table Section */}
      <div className="table-container">
        <Table
          headers={[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Registration Type", key: "registration_type" },
            { label: "Phone Number", key: "phone_number" },
            { label: "Certificate PDF", key: "certificatePDF" },
            { label: "Actions", key: "actions" },
          ]}
          data={tableData}
        />
      </div>

      {/* File Upload Dialog */}
      {isDialogOpen && (
        <Dialog
          viewHeader={true}
          header="Upload Certificate File"
          open={isDialogOpen}
          setOpen={setDialogOpen}
        >
          <div className="dialog-content-files">
            <div className="file-con">
              <ImageUpload
                required
                label="Certificate File"
                allowedExtensions={["pdf", "jpg", "jpeg", "png"]}
                inputValue={file}
                setInputValue={setFile}
                className="image-upload"
                placeholder="Choose a file"
              />
            </div>

            <div className="buttons-file">
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

      {/* Pagination Section */}
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CertificateComponent;
