import { useNavigate } from "react-router-dom";
import "./style.scss";
const SuccessP = () => {
  const navigate=useNavigate();
  return (
    <div className="success-container">
      <div className="success-content">
        <h1 className="success-title">نجاح عملية الدفع</h1>
        <p className="success-message">تمت العملية بنجاح! شكراً لك على الدفع.</p>
        <button className="back-button" onClick={() => navigate("/")}>
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default SuccessP;
