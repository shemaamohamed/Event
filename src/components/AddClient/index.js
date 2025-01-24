import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import ImageUpload from "../../CoreComponent/ImageUpload";
import toast from "react-hot-toast";

const AddClient = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clients, setClients] = useState([]);
  const BaseUrl = "https://panel.mayazin.co/api";

  useEffect(() => {
    const fetchClients = () => {
      axios
        .get(`${BaseUrl}/clients`)
        .then((response) => {
          console.log(response.data);
          setClients(response.data);
        })
        .catch((error) => {
          console.error("Error fetching clients:", error.response ? error.response.data : error.message);
        });
    };

    fetchClients();
  }, []);

  // Handler for file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError(null);
    } else {
      setError("Please upload a valid image.");
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const token = localStorage.getItem("token");
    const BaseUrl = process.env.REACT_APP_BASE_URL;

    axios
      .post(`${BaseUrl}/clients`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Client created successfully!");
      })
      .catch((error) => {
        setError("An error occurred while uploading the image.");
      });
  };

  // Handler for deleting a client
  const handleDeleteClient = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`${BaseUrl}/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Client deleted successfully!");
        // Remove the client from the state
        setClients(clients.filter((client) => client.id !== id));
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the client.");
      });
  };

  return (
    <div className="add-client">
      <h2>Add Client Image</h2>
      <form onSubmit={handleSubmit} className="form">
        <ImageUpload
          label="Upload Image"
          inputValue={image}
          setInputValue={setImage}
          allowedExtensions={["jpg", "jpeg", "png", "gif"]}
        />
        <button type="submit"
        style={{
          backgroundColor:'#9B1321'
        }}
         className="submit-btn">
          Upload
        </button>
      </form>
      {success && <p className="success">Image uploaded successfully!</p>}

      <div className="auto-container">
        <h3>Clients List</h3>
        <div className="clients-list">
          {clients.map((client) => (
            <div className="client-item" key={client.id}>
              <div className="client-image">
                <img src={`https://mayazin.co/backend/storage/app/public/${client.image}`} alt={`Client ${client.id}`} />
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClient(client.id)} // Call delete handler directly
                >
                  <span className="delete-icon">X</span> {/* You can use an icon here */}
                </button>
              </div>
              <div className="client-info">
                <p>{client.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddClient;
