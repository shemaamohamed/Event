import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const SuccessP = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const done = useRef(false); // Use a ref to track if payment is processed

  const navigate = useNavigate();
  const location = useLocation();
  const { type, id } = useParams();
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("token");
    if (orderId && paymentStatus === null && !done.current) { // Check if payment hasn't been done yet
      capturePayment(orderId);
    }
  }, [location.search, paymentStatus]); // Dependency on location.search to trigger effect
  useEffect(() => {
    if (paymentStatus === "success") {
if(type == "visa"){
      setTimeout(() => {
        navigate("/visa");
      }, 3000); // 3000 milliseconds = 3 seconds
} else if(type == "flight"){
  setTimeout(() => {
    navigate("/flight/form");
  }, 3000);
}else if(type == "reservation"){
  setTimeout(() => {
    navigate("/reservation/form");
  }, 3000);
}else if(type == "pTrip"){
  setTimeout(() => {
    navigate("/view-user-trips");
  }, 3000);
}else if(type == "airport"){
  setTimeout(() => {
    navigate("/airport/transfer");
  }, 3000);
} else if (type === "att") {
  setTimeout(() => {
    navigate(`/register/attendance/${id}`); 
  }, 3000);
}
}
}, [paymentStatus, navigate]); // This will run when paymentStatus changes

  const capturePayment = async (orderID) => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;

    if (done.current) {
      return; // Prevent re-calling if the payment is already processed
    }
    done.current = true; // Mark payment as done
    try {
      const response = await axios.get(
        `${BaseUrl}/paypal/capture-payment/${orderID}`
      );
      const transaction_id = response.data.id;
      const paymentSource = response.data.payment_source;

      setTransactionId(transaction_id);
      let method = "";
      if (paymentSource.paypal) {
        method = "PayPal";
      } else {
        method = "Visa";
      }

      setPaymentMethod(method);

      if (response.data.status === "COMPLETED") {
        setPaymentStatus("success");

        if (type === "visa") {
          captureVisaPayment(id, transaction_id, method);
        } else if (type == "flight"){
          captureFlightPayment(id, transaction_id, method);

        }else if (type == "reservation"){
          captureResPayment(id, transaction_id, method);

        }else if (type == "pTrip"){
          captureTripPayment(id, transaction_id, method);

        }else if (type == "dinner"){
          captureDinnerPayment(id, transaction_id, method);
        }else if (type == "airport"){
          captureAirPayment(id, transaction_id, method);
        }else if (type == "att"){
          console.log("hhhhhhhh");
          
          // captureAirPayment(id, transaction_id, method);
        }
      } else {
        setPaymentStatus("failed");
        setErrorMessage(response.data.status);
      }
    } catch (error) {
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع.");
    }
  };

console.log(type);

  const captureResPayment = async (id, transaction_id, payment_method) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/reservation/pay/${id}`,
        {
          transaction_id: transaction_id,
          payment_method: payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع الخاص بـ Visa.");
    }
  };

  const  captureDinnerPayment = async (id, transaction_id, payment_method) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/dinner/attendees/status/s/${id}`,
        {
          transaction_id: transaction_id,
          payment_method: payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع الخاص بـ Visa.");
    }
  };

  const captureTripPayment = async (id, transaction_id, payment_method) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/pay/5/${id}`,
        {
          transaction_id: transaction_id,
          payment_method: payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع الخاص بـ Visa.");
    }
  };
  const captureAirPayment = async (id, transaction_id, payment_method) => {
    const token = localStorage.getItem("token");
    console.log(id, transaction_id, payment_method);
    
    try {
      const response = await axios.post(
        `${BaseUrl}/pay/airport/${id}`,
        {
          transaction_id: transaction_id,
          payment_method: payment_method,
        },
        {
          headers: {
            "Content-Type": "application/json", // ✅ تأكيد أن البيانات ترسل كـ JSON

            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع الخاص بـ Visa.");
    }
  };







  const captureVisaPayment = async (id, transaction_id, payment_method) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/visa/pay/${id}`,
        {
          transaction_id: transaction_id,
          payment_method: payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع الخاص بـ Visa.");
    }
  };
  const captureFlightPayment = async (id, transaction_id, payment_method) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/pay/${id}`,
        {
          transaction_id: transaction_id,
          payment_method: payment_method,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      setErrorMessage("حدث خطأ أثناء معالجة الدفع الخاص بـ Visa.");
    }
  };
  return (
    <div className={`payment-container ${paymentStatus}`}>
      {paymentStatus === "success" ? (
        <div className="success-message">
          <h2>🎉 Payment Successful!</h2>
          <p>You will be redirected to the homepage shortly...</p>
        </div>
      ) : paymentStatus === "failed" ? (
        <div className="failed-message">
          <h2>❌ Payment Failed!</h2>
          <p>{errorMessage}</p>
          <button onClick={() => navigate("/visa")}>Go back to the homepage</button>
        </div>
      ) : (
        <p>Processing payment...</p>
      )}
    </div>
  );
  
};

export default SuccessP;

