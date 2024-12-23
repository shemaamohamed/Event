import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import Dialog from "../../CoreComponent/Dialog";
import ImageUpload from "../../CoreComponent/ImageUpload";
import axios from "axios";
import "./style.scss";
import { toast } from "react-toastify";
import httpService from "../../common/httpService";

const FlightsFiles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(0);

  const [data, setData] = useState([]);
  // Mock data for the table


  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "User Name" },
    { key: "status", label: "Flight Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleUploadClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getData = () => {
    // استبدال التوكن هنا
    const token = localStorage.getItem("token");

    axios.get(`${BaseUrl}/pay/approved`,
      { headers: { Authorization: `Bearer ${token}` } }

    )
      .then((response) => {
        console.log('Response:', response);
        setData(response?.data?.approved_invoices.map((item) => {
          return {
            id: item?.invoice_id,
            name: item.user?.name || "",
            email: item.user?.email || "",
            status: item.status,

          }
        })); // تخزين البيانات في الحالة (state)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getData()
  }, [])
  const handleSubmit = async () => {
    // post api to upload fil
    const formData = new FormData();
    formData.append("ticketPDF", file);
    const authToken = localStorage.getItem("token")
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
  const tableData = data.map((row) => ({
    ...row,
    actions: (
      <button className="upload-button" onClick={() => {
        handleUploadClick(row)
        setId(row.id)
      }
      }

      >
        Upload Flight Ticket
      </button>
    ),
  }));
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flights-files-container">
      <h1 className="visa-files">Flights Files</h1>
      <Table headers={headers} data={tableData} />

      {isDialogOpen && (
        <Dialog
          viewHeader={true}
          header={`Upload Ticket File }`}
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
