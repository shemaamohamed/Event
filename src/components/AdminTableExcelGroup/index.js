import React, { useState, useEffect, Fragment } from "react";
import Table from "../../CoreComponent/Table";
import Pagination from "../../CoreComponent/Pagination";
import Dialog from "../../CoreComponent/Dialog";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import "./style.scss";

const ActiveRegistrations = () => {
  const [registrationsData, setRegistrationsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState(null);

  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch registrations data
  const fetchRegistrations = async (page = 1) => {
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/admin/all/excel`,
        params: { page },
        headers: { Authorization: `Bearer ${token}` },
        onSuccess: (data) => {
          setRegistrationsData(data.registrations || []);
          setTotalPages(data?.totalPages || 1);
          setCurrentPage(Number(data?.currentPage) || 1);
        },
        onError: (error) => setErrorMsg(error?.message || "Failed to fetch registrations."),
        withToast: true,
      });
    } catch (error) {
      setErrorMsg("Failed to fetch registrations.");
    }
  };

  const handlePageChange = (page) => {
    fetchRegistrations(page);
  };

  const handleUploadClick = (registration) => {
    setFile(null); // Reset file before uploading
    setDialogOpen(true);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/admin/excel-upload`, // Adjust endpoint as needed
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
        onSuccess: () => {
          toast.success("File uploaded successfully!");
          fetchRegistrations(); // Refresh the list after file upload
        },
        onError: (error) => console.error("Failed to upload file:", error),
      });
    } catch (error) {
      console.error("Failed to upload file:", error);
    }

    setDialogOpen(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const tableData = registrationsData.map((registration) => ({
    ...registration,
    user_name: registration.user_name,
    user_email: registration.user_email,
    contact_phone: registration.contact_phone,
    organization_name: registration.organization_name,
    contact_person: registration.contact_person,
    number_of_doctors: registration.number_of_doctors,
    excel_file: registration.excel_file ? (
      <a
        href={`${BaseUrl}/${registration.excel_file}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Excel
      </a>
    ) : (
      "No File"
    ),
    update_deadline: registration.update_deadline,
  }));

  return (
    <Fragment>
      <div className="registrations-component">
        <div className="table-container">
          <div className="table-wrapper">
            <Table
              headers={[
                { label: "Username", key: "user_name" },
                { label: "Email", key: "user_email" },
                { label: "Contact Phone", key: "contact_phone" },
                { label: "Organization", key: "organization_name" },
                { label: "Contact Person", key: "contact_person" },
                { label: "Number of Doctors", key: "number_of_doctors" },
                { label: "Excel File", key: "excel_file" },
                { label: "Update Deadline", key: "update_deadline" },
              ]}
              data={tableData}
            />
          </div>
        </div>

        {isDialogOpen && (
          <Dialog
            viewHeader={true}
            header="Upload Excel File"
            open={isDialogOpen}
            setOpen={setDialogOpen}
            className="dialog-file"
          >
            <div className="dialog-content">
          
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

export default ActiveRegistrations;
