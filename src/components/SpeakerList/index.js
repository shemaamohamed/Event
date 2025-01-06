import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.scss'; // تضمين ملف الـ SCSS

// كمبوننت لعرض رابط المستخدم
const UserLinkCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [link, setLink] = useState(null); // متغير لحفظ الرابط
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // دالة لجلب الرابط من الـ API
  const fetchLink = async () => {
    setIsLoading(true);
    try {
      // الحصول على التوكن من الـ localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("توكن المستخدم غير موجود.");
        setIsLoading(false);
        return;
      }

      // إرسال الطلب مع التوكن في الهيدر
      const response = await axios.get(`${BaseUrl}/speakers/user/link`, {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
        },
      });

      // تحديث الرابط الذي تم جلبه
      setLink(response?.data?.link);
    } catch (err) {
      setError("فشل في جلب الرابط.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // جلب الرابط عند تحميل الكمبوننت
  useEffect(() => {
    fetchLink();
  }, []);

  return (
    <div className="user-link-container">
      {/* عرض الرابط إذا كان موجودًا */}
      {isLoading ? (
        <div className="loading-text">Loading link...</div>
      ) : (
        <>
          {link ? (
            <a className="link-button" href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          ) : (
            <div className="no-link-text">No Link</div>
          )}
        </>
      )}

      {/* عرض رسالة خطأ إذا حدث مشكلة */}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default UserLinkCard;
