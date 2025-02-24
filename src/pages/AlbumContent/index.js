import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrlImages } from "../../constant/config";
import { Gallery } from 'react-photoswipe-gallery';
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Album = () => {
    const { id } = useParams(); // جلب الـ id من الـ URL
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null); // لتخزين بيانات المستخدم
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    

 
  

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagess.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagess.length - 1 : prevIndex - 1
    );
  };

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/images/album/${id}`);
            setCoverImage(response.data.data.cover_image || []);
            setImages(response.data.data.images || []);
        } catch (err) {
            setError("Failed to fetch images");
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (imageName) => {
        try {
            // إرسال طلب DELETE مع الـ id واسم الصورة
            await axios.delete(`${BaseUrl}/albums/${id}/delete-image/${imageName}`);
            // تحديث الصور بعد الحذف
            setImages(images.filter(img => img !== imageName));
        } catch (err) {
            setError("Failed to delete image");
        }
    };

    useEffect(() => {
        fetchImages();
    }, [id]);
    const fetchUserData = async () => {

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BaseUrl}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserData(response?.data?.user.isAdmin);
                console.log(response?.data?.user.isAdmin);
                
            } 
        } catch (error) {
            console.error("Error fetching user data:", error);
         
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    const imagess = images?.map((img) => ({
        img: `${backendUrlImages}/${img}`,
        title: "Image",
    }));
   
    return (
        <div style={{ width:'90%', margin: "auto", padding: "20px", textAlign: "center",marginTop:'10vh', fontFamily: "Arial, sans-serif" }}>
        {/* <h2 style={{ color: "#333", marginBottom: "15px" }}>Album {id}</h2> */}

        {loading && <p style={{ color: "#007bff" }}>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {coverImage && (
            <div style={{ marginBottom: "20px" }}>
                <img
                    src={`${backendUrlImages}/${coverImage}`}
                    alt="Cover"
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                />
            </div>
        )}


            {images.length > 0 ? (
                <div className="row" >
                   <Gallery withDownloadButton>
                   {images.map((img, index) => (
                        <div key={index}
                        onClick={() => openModal(index)} sx={{ cursor: "pointer" }}
                        className="gallery-item col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center" 
                         style={{ 
                            position: "relative", 
                            overflow: "hidden",
                            transition: "transform 0.3s",

                        }}>
                            <img
                                src={`${backendUrlImages}/${img}`}
                                alt={`Image ${index}`}
                                style={{
                                  cursor: "pointer",
                                    width: "100%",
                                    objectFit: "contain",
                                    transition: "opacity 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                                onMouseOut={(e) => (e.target.style.opacity = "1")}
                            />
                            
                            {userData===1 && (
                                <button
                                    onClick={() => deleteImage(img)}
                                    style={{
                                        position: "absolute",
                                        top: "8px",
                                        right: "8px",
                                        backgroundColor: "rgba(255, 0, 0, 0.8)",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        transition: "background 0.3s",
                                    }}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.8)")}
                                >
                                    ✖
                                </button>
                            )}
                        </div>
                    ))}
                   </Gallery>
                    
                </div>
            ) : (
                <p style={{ color: "#777", fontStyle: "italic" }}>No images found.</p>
            )}
             {isOpen && (userData === null|| userData===0) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
              zIndex: 1001,
            }}
          >
            <Close />
          </IconButton>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: "0px",
              color: "white",
              zIndex: 1001,
            }}
          >
            <ChevronLeft size={70} />
          </IconButton>
          <img
            src={imagess[currentIndex].img}
            alt={imagess[currentIndex].title}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          />
<IconButton
  onClick={handleNext}
  sx={{
    position: "absolute",
    right: "0px",
    color: "white",
    zIndex: 1100,
  }}
>
  <ChevronRight size={70} /> 
</IconButton>





        </div>
      )}

            </div>
    );
};

export default Album;
