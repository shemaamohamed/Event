import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import './style.scss'; // استيراد ملف الـ SASS
import { backendUrlImages } from "../../constant/config";

const Certification = () => {
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BaseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const getUserData = () => {
            const token = localStorage.getItem("token");

            axios.get(`${BaseUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`  // إضافة التوكن في الهيدر
                }
            })
                .then(response => {
                    setCert(response?.data?.user?.certificatePDF);
                    setLoading(false);  // إيقاف التحميل عند الحصول على البيانات
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError("فشل تحميل البيانات.");
                    // setLoading(false);
                });
        }

        getUserData();
    }, []);

    if (loading) {
        return (
            <Box className="loading-container">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="error-message">
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div className="certification-container">
            <Typography variant="h4" align="center" className="title">Your Certificate</Typography>
            {cert ? (
                <div className="certificate-content">
                    <iframe
                        src={`${backendUrlImages}${cert}`}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="Certificate"
                    />
                    <Button
                        href={`${backendUrlImages}${cert}`}
                        download
                        className="download-button"
                    >
                        Download Certificate
                    </Button>
                </div>
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                    No certificate available.
                </Typography>
            )}
        </div>
    );
    
}

export default Certification;
