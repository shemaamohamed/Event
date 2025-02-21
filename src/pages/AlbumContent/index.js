import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrlImages } from "../../constant/config";

const Album = () => {
    const { id } = useParams(); // جلب الـ id من الـ URL
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null); // لتخزين بيانات المستخدم

    const BaseUrl = process.env.REACT_APP_BASE_URL;

    // دالة لجلب الصور
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

    // دالة لحذف الصورة
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
    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", textAlign: "center",marginTop:'10vh', fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ color: "#333", marginBottom: "15px" }}>Album {id}</h2>

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

        <div>
            {images.length > 0 ? (
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                    gap: "15px",
                    justifyContent: "center"
                }}>
                    {images.map((img, index) => (
                        <div key={index} style={{ 
                            position: "relative", 
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s",
                        }}>
                            <img
                                src={`${backendUrlImages}/${img}`}
                                alt={`Image ${index}`}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    transition: "opacity 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                                onMouseOut={(e) => (e.target.style.opacity = "1")}
                            />
                            
                            {userData && (
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
                </div>
            ) : (
                <p style={{ color: "#777", fontStyle: "italic" }}>No images found.</p>
            )}
        </div>
    </div>
    );
};

export default Album;
