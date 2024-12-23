import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import Dialog from "../../CoreComponent/Dialog";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import httpService from "../../common/httpService";
import { toast } from "react-toastify";

const VisaFiles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(0);

  const [data, setData] = useState([]);
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
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const getData = async () => {

    // todo ayat get the data , all visa wher payment status === aproved
    const authToken = localStorage.getItem("token")
    try {
      const response = await httpService({
        method: "GET",
        url: `${BaseUrl}/completed/visa`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },

        onSuccess: async (response) => {
          console.log(response?.visas?.map((item) => {
            return {
              id: item.visa.id,
              name: item.user.name,
              email: item.user.email,
              status: item.visa.status,
            }
          }));

          setData(response?.visas?.map((item) => {
            return {
              id: item.visa.id,
              name: item.user.name,
              email: item.user.email,
              status: item.visa.status,
            }
          }))
        },
        onError: (error) => console.error("Failed to fetch user data:", error),
      });


    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
    // setData();
  };

  const handleSubmit = async () => {
    // post api to upload fil
    const formData = new FormData();
    formData.append("visapdf", file);
    // todo ayat get the data , all visa wher payment status === aproved
    const authToken = localStorage.getItem("token")
    try {
      const response = await httpService({
        method: "POST",
        url: `${BaseUrl}/add/visaPDF/${id}`,
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
  const tableData = data.map((row) => ({
    ...row,
    actions: (
      <button className="upload-button"
        onClick={(() => {
          handleUploadClick(row)
          setId(row.id)
        })}
      >
        Upload Visa File
      </button>
    ),
  }));
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="visa-files-container">
      <h1 className="visa-files">Visa Files</h1>
      <Table headers={headers} data={tableData} />

      {isDialogOpen && (
        <Dialog
          viewHeader={true}
          header={`Upload Visa File`}
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

export default VisaFiles;
