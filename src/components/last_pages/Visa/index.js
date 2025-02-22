import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after clicking "Yes"
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../../CoreComponent/Input";
import ImageUpload from "../../../CoreComponent/ImageUpload"; // Importing ImageUpload component
import DateInput from "../../../CoreComponent/Date"; // Importing DateInput component
import "./style.scss"; // Importing Sass file for styling
import httpService from "../../../common/httpService";
import { getFromLocalStorage } from "../../../common/localStorage";
import SimpleLabelValue from "../../SimpleLabelValue";
import { useAuth } from "../../../common/AuthContext";
import { backendUrlImages } from "../../../constant/config";
import { PayPalButton } from "react-paypal-button-v2";

const VisaPage = () => {
  const { userId } = useAuth();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { myConferenceId } = useAuth();

  const navigate = useNavigate(); // For navigation later
  const [showVisaForm, setShowVisaForm] = useState(false); // Control the display of the form
  const [passportImage, setPassportImage] = useState(null);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [error, setError] = useState("");
  const [visapdf, setVisapdf] = useState(null);

  const [visaPrice, setVisaPrice] = useState(0); // Changed initial state to null to check for data
  const [visaData, setVisaData] = useState(""); // Changed initial state to null to check for data
  const [speakerData, setSpeakerData] = useState(null);

  const handleUserChoice = (choice) => {
    if (choice === "yes") {
      setShowVisaForm(true); // Show the visa form if "Yes" is chosen
    } else {
      setShowVisaForm(false); // Close the form if "No" is chosen
      navigate("/flight/form");
    }
  };

  console.log(myConferenceId);

  const getConferenceById = async () => {
    if (!myConferenceId) {
      return;
    }
    try {
      // إضافة await هنا للحصول على البيانات بشكل صحيح
      const response = await axios.get(`${BaseUrl}/con/id/${myConferenceId}`);

      // تحقق من أن response.data.conference.visa_price موجود
      const fetchedVisaPrice = response.data.conference.visa_price;
      setVisaPrice(fetchedVisaPrice); // تحديث حالة visaPrice

      console.log("Visa Price:", fetchedVisaPrice); // للتحقق من القيمة المسترجعة
    } catch (error) {
      console.error("Error fetching Conference details", error);
    }
  };
  useEffect(() => {
    getConferenceById(); // استدعاء getConferenceById عند تغيير myConferenceId
  }, [myConferenceId]); // Trigger whenever myConferenceId changes
  const handlePaymentSuccess = (data) => {
    if (data.state === 'approved') {
      toast.success('Your payment has been successfully processed!');
      // توجيه المستخدم إلى صفحة أخرى بعد النجاح
      navigate('/payment-success');
    } else {
      toast.error('Payment failed, please try again.');
    }
  };
  
  const handlePayNow = () => {
    const transactionId = `visa_${Date.now()}`; 
    // توجه المستخدم إلى صفحة PayPal لبدء عملية الدفع
const paymentUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mamoun.khraisha@yahoo.com&amount=${visaData.visa_cost}&currency_code=USD&item_name=VisaPayment&return=${encodeURIComponent(`https://eventscons.com/success`)}&cancel_return=https://eventscons.com/failed`;

    window.location.href = paymentUrl;  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from local storage

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("passport_image", passportImage); // Ensure passportImage is a file
    formData.append("arrival_date", arrivalDate);
    formData.append("departure_date", departureDate);
    formData.append("visa_cost", visaPrice);

    try {
      const response = await axios.post(`${BaseUrl}/visa`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass token in header
        },
      });

      toast.success("The Data updated Successfully"); // Show success message

      // Fetch updated visa data after successful submission
      await fetchVisaData(); // <-- Add this line to fetch updated data
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  const fetchVisaData = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token

    try {
      const data = await httpService({
        method: "GET",
        url: `${BaseUrl}/visa`,
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
        },
        onSuccess: (response) => setVisaData(response),
        onError: (err) => setError(err),
        withToast: true, // Show toast
      });
      setVisaData(data.visa);
      setVisapdf(data.visa.visapdf);

      // Set fields based on the data
      if (data.visa) {
        setArrivalDate(data.arrival_date);

        setDepartureDate(data.departure_date);
        setShowVisaForm(false); // Hide the form if there is data
      } else {
        setShowVisaForm(false); // Hide the form if there is no data
      }
    } catch (error) {
      setError("Error fetching visa data.");
    }
  };
  const token = localStorage.getItem("token"); // استرجاع التوكن
  console.log(visapdf);
  // const fetchSpeakerData = async () => {

  //   try {
  //     // استدعاء الـ API باستخدام httpService
  //     const data = await httpService({
  //       method: "GET",
  //       url: `${BaseUrl}/speakers/info`, // الـ URL الخاص بالمتحدثين
  //       headers: {
  //         Authorization: `Bearer ${token}`, // تمرير التوكن في الهيدر
  //       },
  //       onSuccess: (response) => setSpeakerData(response),
  //       onError: (err) => setError(err),
  //       withToast: false, // عرض توست في حالة نجاح أو فشل الطلب
  //     });

  //     // تحقق من قيمة is_visa_payment_required داخل البيانات المسترجعة
  //     const isVisaPaymentRequired = speakerData.speaker.is_visa_payment_required;
  // console.log(isVisaPaymentRequired);

  // // إذا كانت القيمة 1، قم بتحديث visaPrice
  // if (isVisaPaymentRequired === 1) {
  //   setVisaPrice(originalVisaPrice); // تعيين الـ visa_price المأخوذ من الـ API
  // } else {
  //   setVisaPrice(0); // تعيين السعر إلى 0 إذا لم يكن هناك حاجة لدفع الفيزا
  // }

  //     console.log("Speaker Data:", data.speaker);
  //     console.log("Visa Price:", data.speaker.visa_price);

  //   } catch (error) {
  //     setError("Error fetching speaker data."); // في حال حدوث خطأ
  //   }
  // };

  // استخدام useEffect لاستدعاء الدالة عند تحميل المكون
  useEffect(() => {
    const fetchData = async () => {
      // await fetchSpeakerData();
      await fetchVisaData();
    };
    fetchData();
  }, []);
  console.log(visaPrice);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // تأكد من وجود التوكن في `localStorage`

      // التأكد من وجود التوكن
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        return;
      }

      const response = await axios.delete(`${BaseUrl}/delete/visa/n`, {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
        },
      });

      if (response.status === 200) {
        toast.success("Visa request deleted successfully!");
        // setShowVisaForm(true)
        window.location.reload()
        // يمكنك إضافة المزيد من الإجراءات هنا (مثل إعادة التوجيه أو تحديث الواجهة)
      }
    } catch (error) {
      if (error.response) {
        // إذا كان هناك استجابة من السيرفر
        toast.error(
          error.response.data.error ||
          "An error occurred while deleting the visa request."
        );
      } else {
        // إذا لم تكن هناك استجابة من السيرفر
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  useEffect(() => {
    console.log(visaData);
  }, [visaData]);



  // const handlePayment = async (visaId) => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     alert("User not authenticated!");
  //     return;
  //   }

  //   try {
  //     const paymentData = {
  //       transaction_id: "1234567890", // يجب أن يكون ID من PayPal بعد الدفع الحقيقي
  //       payment_method: "PayPal", // طريقة الدفع
  //     };

  //     const response = await axios.post(`${BaseUrl}/visa/pay/${visaId}`, paymentData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // تمرير التوكن هنا
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.data.success) {
  //       alert("Payment successful!");
  //     } else {
  //       alert("Payment failed! Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     alert("An error occurred while processing the payment.");
  //   }
  // };
  const handlePayment = async (visaId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("User not authenticated!");
      return;
    }
  
    try {
      const paymentData = {
        transaction_id: `visa_${Date.now()}`, // ID المخصص لكل عملية دفع
        payment_method: "PayPal", // طريقة الدفع
        visa_id: visaId // إرسال معرّف الفيزا للمساعدة في تحديد الدفع
      };
  
      const response = await axios.post(`${BaseUrl}/visa/pay/${visaId}`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`, // تمرير التوكن هنا
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        // إذا كانت الاستجابة تحتوي على رابط الدفع من PayPal
        const approvalUrl = response.data.approvalUrl; // هذا الرابط سيكون في الاستجابة من الـ backend
        if (approvalUrl) {
          // إعادة توجيه المستخدم إلى PayPal لإتمام الدفع
          window.location.href = approvalUrl;
        } else {
          alert("Payment failed! No approval URL received.");
        }
      } else {
        alert("Payment failed! Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");
    }
  };
  
  return (
    <div className="visa-page-container">
      {!visaData &&
        !showVisaForm && ( // Show the question only if there is no data and the form is closed
          <div className="question-container">
            <h2>
              Would you like the organizing company to handle the visa for you?
            </h2>
            <div className="button-group">
              <button
                className="yes-btn"
                onClick={() => handleUserChoice("yes")}
              >
                Yes
              </button>
              <button className="no-btn" onClick={() => handleUserChoice("no")}>
                No
              </button>
            </div>
          </div>
        )}

      {showVisaForm && ( // Show the form only if "Yes" was chosen
        <form onSubmit={handleSubmit} className="visa-form">
          <div className="fields-container">
            {/* <div>The Visa Price Is {visaPrice} $</div> */}
            {/* <div>The Visa Price Is {visaPrice ? visaPrice : 0} $</div>  */}

            <ImageUpload
              label="Upload Passport Image"
              inputValue={passportImage}
              setInputValue={setPassportImage}
              allowedExtensions={["jpg", "jpeg", "png", "pdf"]}
              required
            />

            <DateInput
              label="Arrival Date"
              placeholder="YYYY-MM-DD"
              inputValue={arrivalDate}
              setInputValue={setArrivalDate}
              required
            />

            <DateInput
              label="Departure Date"
              placeholder="YYYY-MM-DD"
              inputValue={departureDate}
              setInputValue={setDepartureDate}
              required
            />
          </div>
          <button
            type="submit"
            className={`submit-btn ${!arrivalDate || !departureDate || !passportImage ? "disabled" : ""}`}
            disabled={
              !arrivalDate || !departureDate || !passportImage ? true : false
            }
          >
            Submit
          </button>
        </form>
      )}

      {visaData && (
        <Fragment>
          <h2 className="title-visa-2">Visa Information</h2>

          <div className="visa-info">
            {visaData.arrival_date && (
              <SimpleLabelValue
                label="Arrival Date"
                value={visaData.arrival_date}
              />
            )}
            {visaData.departure_date && (
              <SimpleLabelValue
                label="Departure Date"
                value={visaData.departure_date}
              />
            )}
            <SimpleLabelValue label="Status" value={visaData.status} />
            <SimpleLabelValue
              label="Visa Cost (USD)"
              value={visaData.visa_cost}
            />

            {visaData.updated_at_by_admin && (
              <SimpleLabelValue
                label="Last Updated by Admin"
                value={visaData.updated_at_by_admin}
              />
            )}

            {visapdf && (
              <div className="download-link">
                <a
                  href={`${backendUrlImages}${visapdf}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Visa PDF
                </a>
              </div>
            )}
          </div>
          <div className="actions-section">
            {/* {visaData.visa_cost !== "0.00" && (
              <button className="next-button" onClick={() => { handlePayment(visaData.id) }}>
                Pay
              </button>
            )} */}
            <button
              className="next-button"
              onClick={() => {
                navigate("/flight/form");
              }}
            >
              Next
            </button>

            <button
              className="next-button"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>

            {visaData.visa_cost !== "0.00" && (
        <button className="next-button" onClick={handlePayNow} >
          Pay
        </button>
      )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default VisaPage;
