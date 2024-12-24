import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import { toast } from "react-toastify";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import { backendUrlImages } from "../../constant/config";

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

  const tableData = usersData.map((user) => ({
    ...user,
    name: user?.user?.name,
    email: user?.user?.email,
    abstract: user.abstract ? (
      <a
        href={`${backendUrlImages}${user.abstract}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Abstract
      </a>
    ) : (
      "No Abstract"
    ),
    presentation_file: user.presentation_file ? (
      <a
        href={`${backendUrlImages}${user.presentation_file}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Presentation
      </a>
    ) : (
      "No Presentation"
    ),
    video: user.video ? (
      <a
        href={`${backendUrlImages}${user.video}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Video
      </a>
    ) : (
      "No Video"
    ),
    topics: user.topics ? JSON.parse(user.topics).join(", ") : "No Topics",
    online_participation: user.online_participation ? "Yes" : "No",
    is_online_approved: user.is_online_approved ? "Yes" : "No",
    accommodation_status: user.accommodation_status ? "Booked" : "Not Booked",
    ticket_status: user.ticket_status ? "Approved" : "Rejected",
    dinner_invitation: user.dinner_invitation ? "Yes" : "No",
    airport_pickup: user.airport_pickup ? "Yes" : "No",
    free_trip: user.free_trip ? "Yes" : "No",
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
    <Fragment>
      <div className="speakers-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table
              headers={[
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Abstract", key: "abstract" },
                { label: "Presentation File", key: "presentation_file" },
                { label: "Video", key: "video" },
                { label: "Topics", key: "topics" },
                { label: "Online Participation", key: "online_participation" },
                { label: "Allowed Online", key: "is_online_approved" },
                { label: "Accommodation Status", key: "accommodation_status" },
                { label: "Visa Status", key: "ticket_status" },
                { label: "Have Dinner Invitation", key: "dinner_invitation" },
                { label: "Free Airport Pickup", key: "airport_pickup" },
                { label: "Free Trip", key: "free_trip" },
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

export default SpeakersComponent;
