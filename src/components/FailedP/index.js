import React from 'react';
import "./style.scss"
const FailedP = () => {
  return (
    <div className="failed-container">
      <div className="failed-content">
        <h1 className="failed-title">فشل عملية الدفع</h1>
        <p className="failed-message">حدث خطأ أثناء معالجة الدفع. الرجاء المحاولة مرة أخرى.</p>
        <button className="retry-button">إعادة المحاولة</button>
      </div>
    </div>
  );
};

export default FailedP;
