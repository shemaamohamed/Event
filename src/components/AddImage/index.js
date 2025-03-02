import React, { useState, useRef } from 'react';
import axios from 'axios';
import "./style.scss";
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const AddImagesComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get album id from URL params
  const imageInputRef = useRef(null); // تعريف المرجعية
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // تابع لإضافة صورة واحدة إلى  const BaseUrl = process.env.REACT_APP_BASE_URL;
 
  const handleAddImage = (e) => {
    const newImage = e.target.files[0]; // نأخذ الصورة الأولى فقط
    if (newImage) {
      setImages((prevImages) => [...prevImages, newImage]); // إضافة الصورة إلى المصفوفة
    }
  };

  // تابع لإرسال الصور
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error('Please select at least one image.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    // إضافة الصور المجمعة إلى FormData
    images.forEach((image) => {
      formData.append('images[]', image);
    });

    try {
      const token = localStorage.getItem('token'); // التوكن من localStorage
      const response = await axios.post(
        `${BaseUrl}/album/${id}/add-images`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // التوكن
          },
        }
      );

      if (response.data.success) {
        toast.success('Images added to album successfully!');
        setImages([]); // مسح الصور بعد النجاح
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error('An error occurred while uploading images!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-images-container">
      <h2>Add Images to Album</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-container">
          <input
            id="imageInput" // إضافة المعرف لهذا العنصر
            type="file"
            onChange={handleAddImage}
            accept="image/*"
            className="image-input"
            ref={imageInputRef} // ربط المرجعية مع الـ input
          />
        </div>

        {/* زر إضافة صورة جديدة */}
        <button 
          type="button" 
          className="add-image-button"
          onClick={() => imageInputRef.current.click()} // استخدام المرجعية للنقر على input عند الضغط على الزر
        >
          Add Image
        </button>

        <div className="image-preview">
          {images.length > 0 && (
            <ul>
              {images.map((image, index) => (
                <li key={index}>
                  <img src={URL.createObjectURL(image)} alt={`preview-${index}`} style={{ width: 100, height: 100 }} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* زر رفع الصور */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>
    </div>
  );
};

export default AddImagesComponent;
