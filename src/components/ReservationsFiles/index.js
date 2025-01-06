import React, { useEffect, useState } from "react";
import Table from "../../CoreComponent/Table";
import Dialog from "../../CoreComponent/Dialog";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import httpService from "../../common/httpService";
import toast from "react-hot-toast";
import axios from "axios";
const ReservationsFiles = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);

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
    // الحصول على التوكن من الـ localStorage أو من الـ context أو من أي مصدر آخر
    const token = localStorage.getItem("token"); // إذا كنت تخزن التوكن في الـ localStorage

    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/reservation/approved", {
          headers: {
            Authorization: `Bearer ${token}`, // تمرير التوكن مع الهيدر
          },
        })
        .then((response) => {
          // إذا تم الحصول على البيانات بنجاح
          setData(response?.data?.invoices); // تحديث الحالة بالبيانات المستلمة من الـ API
        })
        .catch((error) => {
          // التعامل مع الأخطاء
          console.error("There was an error fetching the data: ", error);
        });
    } else {
      console.error("Token is missing or expired.");
    }
  };

  const handleSubmit = (id) => {
    // الحصول على التوكن من الـ localStorage أو من الـ context أو من أي مصدر آخر
    const token = localStorage.getItem("token"); // إذا كنت تخزن التوكن في الـ localStorage

    if (token) {
      // إعداد FormData لتحميل الملف
      const formData = new FormData();

      if (file) {
        formData.append("confirmationPDF", file);

        // إرسال طلب POST لتحميل الملف
        axios
          .post(`http://127.0.0.1:8000/api/add/confirmation/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // التعامل مع الاستجابة الناجحة
            console.log("File uploaded successfully:", response.data);
            toast.success("File uploaded successfully:");
            getData();
            setDialogOpen(false); // إغلاق الـ dialog بعد النجاح
          })
          .catch((error) => {
            // التعامل مع الأخطاء
            console.error("There was an error uploading the file: ", error);
          });
      } else {
        console.error("No file selected.");
      }
    } else {
      console.error("Token is missing or expired.");
    }
  };

  const tableData = data?.map((row) => ({
    ...row,
    name: row?.room?.occupant_name,
    actions: (
      <button
        className="upload-button"
        onClick={() => {
          handleUploadClick(row);
          setId(row.id);
        }}
      >
        Upload Confirmation File
      </button>
    ),
  }));
  useEffect(() => {
    getData();
  }, []);
  console.log(id);

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
              <button className="save-button" onClick={() => handleSubmit(id)}>
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
