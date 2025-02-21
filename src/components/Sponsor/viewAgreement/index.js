import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../common/AuthContext";
import "./style.scss"
const ViewAgreement = ({agreementFile, setAgreementFile, handlePrevious ,handleNext}) => {
    // const [agreementFile, setAgreementFile] = useState(null);

    const { myConferenceId } = useAuth();
    const BaseUrl = process.env.REACT_APP_BASE_URL;

    // دالة لتحويل الرابط المعدل
    const getModifiedUrl = (url) => {
        if (!url) return null;
        const parts = url?.split("https://panel.eventscons.com/public/storage/");
        const afterPublic = parts?.slice(parts.indexOf("public") + 1).join("");
        return "https://eventscons.com/backend/storage/app/public/" + afterPublic;
    };

    const fetchFloorPlan = async () => {
        if (!myConferenceId) return;

        try {
            const response = await axios.get(
                `${BaseUrl}/floor/plan/${myConferenceId}`
            );
            const modifiedAgreementFileUrl = getModifiedUrl(response?.data.data[0].agreement_page);
            setAgreementFile(modifiedAgreementFileUrl);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (myConferenceId) {
            fetchFloorPlan();
        }
    }, [myConferenceId]);

    const handleDownload = () => {
        const blob = new Blob([agreementFile], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'agreement-form.pdf'; // تحديد اسم الملف عند التحميل
        link.click();
    };

    return (
        <div className="toto">
             <div className="agreement-description">
                <p>
                    Please download the agreement form, carefully read through the document, 
                    and sign it to confirm your acceptance. Once you've reviewed and signed the 
                    form, upload it as per the instructions provided.
                </p>
            </div>
            {agreementFile && (
                <a
                    href={agreementFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-floor-plans-btn"
                    download
                >
                    <button className="view-floor-plans-button" onClick={handleDownload}>
                        View and Sign Form
                    </button>
                </a>
            )}
                <div className="fixed-buttons">
       
            {/* <button className="prev-button" onClick={handlePrevious}>Prev</button> */}
            <button
            style={{
                backgroundColor:'#9B1321'
              }}
             className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
    );
};

export default ViewAgreement;
