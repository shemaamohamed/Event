import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import Dialog from "../../CoreComponent/Dialog";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import httpService from "../../common/httpService";
import { toast } from "react-toastify";
const ReservationsFiles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
    const [id, setId] = useState(0);
  // Mock data for the table
  const mockData = [
    { id: 1, name: "John Doe", email: "John Doe", status: "approved" },
    {
      id: 2,
      name: "Jane Smith",
      email: "John Doe",
      status: "approved",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "John Doe",
      status: "approved",
    },
  ];

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "User Name" },
    { key: "status", label: "Visa Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleUploadClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };
  const getData = () => {
    // todo ayat get the data , all visa wher payment status === aproved
    setData(mockData);
  };

  const handleSubmit = () => {
    // post api to upload file
    setDialogOpen(false);
  };
  const tableData = data.map((row) => ({
    ...row,
    actions: (
      <button className="upload-button" onClick={() => handleUploadClick(row)}>
        Upload Visa File
      </button>
    ),
  }));
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flights-files-container">
      <h1 className="visa-files">Reservations Files</h1>
      <Table headers={headers} data={tableData} />

      {isDialogOpen && (
        <Dialog
          viewHeader={true}
          header={`Upload Visa File for ${selectedUser?.userName}`}
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

export default ReservationsFiles;
