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
      console.log(response.data.data.images );
      
    } catch (err) {
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  // const deleteImage = async (imageName) => {

  //     try {
  //         // إرسال طلب DELETE مع الـ id واسم الصورة
  //         await axios.delete(`${BaseUrl}/albums/${id}/${imageName}`);
  //         // console.log(response);

  //         setImages(images.filter(img => img !== imageName));
  //     } catch (err) {
  //         setError("Failed to delete image");
  //     }
  // };
  //   const deleteImage = (imageName) => {
  //     // إرسال طلب DELETE مع الـ id واسم الصورة
  //     axios.delete(`${BaseUrl}/albums/${id}/${imageName}`)
  //         .then(response => {
  //             // إذا كانت الاستجابة تحتوي على رسالة نجاح
  //             if (response.data) {
  //                 console.log(response.data.message); // طباعة الرسالة المرسلة من الخادم

  //                 // تحديث قائمة الصور بعد الحذف
  //                 // setImages(images.filter(img => img !== imageName));
  //                 fetchImages();

  //             } else {
  //                 // التعامل مع فشل الحذف
  //                 setError("Failed to delete image");
  //             }
  //         })
  //         .catch(err => {
  //             // التعامل مع الخطأ في حالة فشل الطلب
  //             console.error(err);
  //             setError("Failed to delete image");
  //         });
  // };



  const handleDelete = async (imageName) => {
    const token = localStorage.getItem("token");
    if (!id || !imageName) {
      console.error("Missing album ID or image name");
      return;
    }

    const url = `${BaseUrl}/albums/${id}/${imageName}`;
    console.log("Delete URL:", url);

    try {
      // إعداد الطلب باستخدام axios
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
        },
      });
      fetchImages();

      console.log(response.data.message || "Image deleted successfully");

      // تحديث الحالة بعد الحذف (اختياري)
      // setImages((prev) => prev.filter((img) => img !== imageName));
    } catch (error) {
      // التعامل مع الأخطاء بشكل مفصل
      console.log(error);

      console.error("Error deleting image:", error.response ? error.response.data : error.message);
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
    img: `${backendUrlImages}/${img.image_path}`,
    title: "Image",
  }));

  return (
    <div style={{ width: '90%', margin: "auto", padding: "20px", textAlign: "center", marginTop: '10vh', fontFamily: "Arial, sans-serif" }}>
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
  <div className="row">
    <Gallery withDownloadButton>
      {images.map((img, index) => {
        console.log(img); // طباعة تفاصيل الصورة أو الفيديو

        // التحقق إذا كان الملف فيديو
        const isVideo = img?.image_path?.endsWith(".mp4") || img?.image_path?.endsWith(".avi") || img?.image_path?.endsWith(".mov");

        return (
         !isVideo&&(
            
          <div
          key={index}
          onClick={() => openModal(index)}
          sx={{ cursor: "pointer" }}
          className="gallery-item col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100%",

            transition: "transform 0.3s",
          }}
        >
          {/* عرض الفيديو إذا كان هو النوع */}
         
            <img
              src={`${backendUrlImages}${img?.image_path}`}
              alt={`Image ${index}`}
              style={{
                cursor: "pointer",
                width: "100%",
                objectFit: "contain",
                height: "100%",
                transition: "opacity 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.8")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            />
          

          {/* زر الحذف يظهر فقط إذا كان المستخدم هو المسؤول */}
          {userData === 1 && (
            <button
              // onClick={() => {deleteImage(img)}}
              onClick={() => handleDelete(img.id)}
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
         )
        );
      })}
    </Gallery>
  </div>
) : (
  <p>No images or videos to display.</p>
)}
{images.length > 0 ? (
  <div className="row">
    <Gallery withDownloadButton>
      {images.map((img, index) => {
        console.log(img); // طباعة تفاصيل الصورة أو الفيديو

        // التحقق إذا كان الملف فيديو
        const isVideo = img?.image_path?.endsWith(".mp4") || img?.image_path?.endsWith(".avi") || img?.image_path?.endsWith(".mov");

        return (
         isVideo&&(
            
          <div
            key={index}
            onClick={() => openModal(index)}
            sx={{ cursor: "pointer" }}
            className="gallery-item col-xl-4 col-lg-4 col-md-6 col-sm-12 text-center"
            style={{
              position: "relative",
              overflow: "hidden",
              height: "100%",

              transition: "transform 0.3s",
            }}
          >
            {/* عرض الفيديو إذا كان هو النوع */}
              <video
                controls
                src={`${backendUrlImages}${img?.image_path}`}
                alt={`Video ${index}`}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "opacity 0.3s",

                }}
                onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                onMouseOut={(e) => (e.target.style.opacity = "1")}
              />


            {/* زر الحذف يظهر فقط إذا كان المستخدم هو المسؤول */}
            {userData === 1 && (
              <button
                // onClick={() => {deleteImage(img)}}
                onClick={() => handleDelete(img.id)}
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
         )
        );
      })}
    </Gallery>
  </div>
) : (
  <p>No images or videos to display.</p>
)}





      {isOpen && (userData === null || userData === 0) && (
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
          {
  (imagess[currentIndex].img.endsWith(".mp4") || 
   imagess[currentIndex].img.endsWith(".avi") || 
   imagess[currentIndex].img.endsWith(".mov")) && (
    <video
      controls
      src={imagess[currentIndex].img}
      alt={imagess[currentIndex].title}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
      }}
    />
  )
}
{
  (!imagess[currentIndex].img.endsWith(".mp4") && 
   !imagess[currentIndex].img.endsWith(".avi") && 
   !imagess[currentIndex].img.endsWith(".mov")) && (
    <img
      src={imagess[currentIndex].img}
      alt={imagess[currentIndex].title}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
      }}
    />
  )
}

          
          
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
