import React, { useEffect, useState } from 'react';
import SinglePriceV1 from './SinglePriceV1';
import axios from 'axios';

const PriceV1 = () => {
    const [priceV1Data, setPriceV1Data] = useState([]);  // تأكد من أن المتغير المستخدم هو priceV1Data
    const [conferenceData, setConferenceData] = useState(null); // إضافة حالة للمؤتمر بالكامل

    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const getConference = () => {
        const url = `${BaseUrl}/con/upcoming`;

        axios
            .get(url)
            .then((response) => {
                const upcomingConferences = response?.data?.upcoming_conferences;

                if (upcomingConferences && upcomingConferences.length > 0) {
                    // استخراج الأسعار بشكل مسطح
                    const prices = upcomingConferences.map((item) => item.prices).flat();
                    setPriceV1Data(prices);  // استخدام setPriceV1Data لتحديث الـ state
                    setConferenceData(upcomingConferences[0]);  // تخزين المؤتمر الأول في حالة المؤتمر
                }
            })
            .catch((error) => {
                console.error("Error fetching conferences", error);
            });
    };

    useEffect(() => {
        getConference();  // استدعاء الوظيفة لتحميل البيانات عند تحميل المكون
    }, []);

    return (
        <>
            {conferenceData && (
                <section className="pricing-section">
                    <div className="anim-icons">
                        <span className="icon icon-circle-green"></span>
                        <span className="icon icon-circle-blue"></span>
                        <span className="icon icon-circle-pink"></span>
                    </div>
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <span className="title">Get Ticket</span>
                            <h2>{conferenceData.title}</h2>  {/* تم عرض عنوان المؤتمر هنا */}
                            <p>{conferenceData.description}</p>  {/* وصف المؤتمر */}
                        </div>
                        <div className="outer-box">
                            <div className="row">
                                {priceV1Data?.map((plan, index) => (  // استخدم priceV1Data بدلاً من PriceV1Data
                                    <div className="pricing-block col-lg-4 col-md-6 col-sm-12" key={index}>
                                        <SinglePriceV1 
                                            plan={plan}
                                            conferenceData={conferenceData}  // تمرير بيانات المؤتمر بالكامل إلى المكون
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default PriceV1;
