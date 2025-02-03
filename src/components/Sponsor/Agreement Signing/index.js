import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../common/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.scss"
const AgreementSigning = ({ handleNext, handlePrevious }) => {
    const [firstAdvertisement, setFirstAdvertisement] = useState(null);
    const [secondAdvertisement, setSecondAdvertisement] = useState(null);
    const [logo, setLogo] = useState(null);
    const [contractSignature, setContractSignature] = useState(null);
    const [isAgreementSigned, setIsAgreementSigned] = useState(false);

    const navigate = useNavigate();
    const isFormValid =  logo && contractSignature;

    const handleSignAgreement2 = async () => {
        // تحويل الملفات إلى FormData
        const formData = new FormData();
        if (firstAdvertisement) formData.append('first_advertisement', firstAdvertisement || null);
        if (secondAdvertisement) formData.append('second_advertisement', secondAdvertisement || null);
        if (logo) formData.append('logo', logo);
        if (contractSignature) formData.append('contract_signature', contractSignature);

        try {
            // الحصول على التوكن من localStorage
            const token = localStorage.getItem('token');

            // إرسال الـ POST request باستخدام Axios
            const response = await axios.post(
                `${BaseUrl}/sponsor/add/adv`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            // إذا كانت العملية ناجحة، عرض توست
            if (response.status === 200) {
                toast.success('Agreement submitted successfully!');
                setIsAgreementSigned(true); // تم التوقيع بنجاح
            }
        } catch (error) {
            // في حالة حدوث خطأ، عرض رسالة خطأ
            console.error('Error submitting agreement:', error);
            toast.error('There was an error while submitting the agreement. Please try again later.');
        }
    };

    const { userId } = useAuth();
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const { myConferenceId } = useAuth();

    return (
        <div className="container-style">
            {/* عرض المدخلات مباشرة بدلاً من الpopup */}
            <div className="agreement-form">
                <h3>Agreement for Sponsorship</h3>
                <p>
                    By signing this agreement, you confirm your commitment to sponsor the event. Please upload the necessary documents below.
                </p>

                <div className="input-fields">
                    <div className="file-upload">
                        <label htmlFor="first_advertisement">First Advertisement (PDF)</label>
                        <input
                            id="first_advertisement"
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFirstAdvertisement(e.target.files[0])}
                        />
                    </div>
                    <div className="file-upload">
                        <label htmlFor="second_advertisement">Second Advertisement (PDF)</label>
                        <input
                            id="second_advertisement"
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setSecondAdvertisement(e.target.files[0])}
                        />
                    </div>
                    <div className="file-upload">
                        <label htmlFor="logo">Logo (Image)</label>
                        <input
                            id="logo"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => setLogo(e.target.files[0])}
                        />
                    </div>
                    <div className="file-upload">
                        <label htmlFor="contract_signature">Contract Signature (PDF)</label>
                        <input
                            id="contract_signature"
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setContractSignature(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="form-buttons">
                    <button
                        onClick={handleSignAgreement2} // استدعاء الدالة مباشرة
                        className="btn-sign"
                        disabled={!isFormValid} // تعطيل الزر إذا كان النموذج غير صالح
                    >
                        Sign Agreement
                    </button>
                </div>
            </div>

            {isAgreementSigned && (
                <div className="agreement-status">
                    <p>Your agreement has been signed successfully!</p>
                </div>
            )}
            <div className="fixed-buttons">

                {/* <button className="prev-button" onClick={handlePrevious}>Prev</button> */}
        {isAgreementSigned &&<button
                   
                    style={{
                        backgroundColor: '#9B1321'
                    }}
                    className="next-button" onClick={handleNext}>
                    Next
                </button>}
            </div>
        </div>
    );
};

export default AgreementSigning;
