import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import "./style.scss";

const PayAtt = () => {
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const done = useRef(false);  // استخدام useRef
    const navigate = useNavigate(); // للتوجيه إلى صفحة /login
    const { userId, conferenceId, priceId } = useParams();
    const location = useLocation();

    function getPrice(conferenceData) {
        const conference = conferenceData.find((conf) => conf.id == conferenceId);
        if (!conference) {
            return `Conference with ID ${conferenceId} not found.`;
        }
        const doctorPrice = conference.prices.find((price) => price.id == priceId);
        if (!doctorPrice) {
            return `Doctor price not found for conference ID ${conferenceId}.`;
        }
        return doctorPrice.price;
    }

    const getConference = () => {
        const url = `${process.env.REACT_APP_BASE_URL}/con/upcoming`;
        axios
            .get(url)
            .then((response) => {
                setPrice(getPrice(response?.data?.upcoming_conferences));
            })
            .catch((error) => {
                console.error("Error fetching conferences", error);
            });
    };

    const handlePayment = async () => {
        const type = "att";
        const id = conferenceId;
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/paypal2/create-payment2/2`,
                {
                    amount: price,
                    return_url: `https://eventscons.com/pay/${userId}/${conferenceId}/${priceId}`,
                    cancel_url: `https://eventscons.com/failed`,
                }
            );
            const orderID = response.data.order_id;
            // window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
            window.location.href = `https://www.paypal.com/checkoutnow?token=${orderID}`;
        } catch (error) {
            console.error("❌ خطأ أثناء إنشاء الطلب:", error);
            alert("حدث خطأ، حاول مرة أخرى.");
        } finally {
            setLoading(false);
        }
    };

    const capturePayment = async (orderID) => {
        if (done.current) return;
        done.current = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paypal/capture-payment/${orderID}`);
            const transaction_id = response.data.id;
            const payment_source = response.data.payment_source;

            setTransactionId(transaction_id); // حفظ transactionId
            let method = "";
            if (payment_source.paypal) {
                method = "PayPal";
            } else {
                method = "Visa";
            }

            setPaymentMethod(method); // حفظ طريقة الدفع

            if (response.data.status === "COMPLETED") {
                setPaymentStatus("success");
                // الانتقال إلى صفحة /login بعد الدفع الناجح
                await captureAttPayment(orderID, transaction_id, method);

                // ✅ إعادة التوجيه إلى صفحة تسجيل الدخول
                navigate("/login");
                
            } else {
                setPaymentStatus("failed");
                setErrorMessage(response.data.status);
            }
        } catch (error) {
            setPaymentStatus("failed");
            setErrorMessage("حدث خطأ أثناء معالجة الدفع.");
        }
    };

    const captureAttPayment = async (id, transaction_id, payment_method) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/invoice/att`,
                {
                    transaction_id: transaction_id,
                    payment_method: payment_method,
                    priceId: priceId,
                    userId: userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
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

    useEffect(() => {
        getConference();
    }, []);

    // استخدام useEffect للتحقق من حالة الدفع عند العودة من PayPal
    useEffect(() => {
        const orderID = new URLSearchParams(location.search).get("token");
        if (orderID) {
            capturePayment(orderID);
            capturePayment();
        }
    }, [location.search]);

    return (
        <div>
            {/* عرض رسالة الدفع المطلوبة فقط إذا لم يتم الدفع بعد */}
            {paymentStatus === false && (
                <div className="payment-section">
                    <div>Payment Required</div>
                    <div>
                        Please make a payment of ${price} to proceed with the registration.
                    </div>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handlePayment}
                        disabled={isProcessingPayment}
                    >
                        {isProcessingPayment ? "Processing..." : `Pay $${price}`}
                    </Button>
                </div>
            )}

            {/* إذا تم الدفع بنجاح، عرض هذه الرسالة */}
            {paymentStatus === "success" && (
                <div>
                    <h2>Payment Successful!</h2>
                    <p>You have successfully completed the payment. You will be redirected to the login page.</p>
                </div>
            )}

            {/* إذا كان هناك خطأ في الدفع، عرض الرسالة التالية */}
            {paymentStatus === "failed" && (
                <div>
                    <h2>Payment Failed</h2>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default PayAtt;
