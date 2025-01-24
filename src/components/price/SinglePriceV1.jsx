import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { backendUrlImages } from '../../constant/config';
import "./style.scss"
const SinglePriceV1 = ({ plan,conferenceData }) => {
    const {
        price,
        price_type, // هذا هو نوع السعر الذي سيكون له دور في العنوان
        description, // وصف السعر
    } = plan;
const {title,start_date,end_date,location,logo,image} =conferenceData
    // يمكن إضافة قيم افتراضية مثل الأيقونات بناءً على الـ type أو يمكن تخصيصها حسب الحاجة
    const icon = "icon icon-ticket";  // مثال، يمكنك تخصيص الأيقونة حسب السعر أو نوعه
console.log(logo);

    return (
        <div className="inner-box">
            {/* <div className="icon-box">
                <div className="icon-outer"><span className={icon}></span></div>
            </div> */}
                  <div className="icon-box">
                <div className="icon-outer">
                    {/* استخدم الشعار كـ <img> بدلاً من الأيقونة */}
                    {logo ? <img src={`${backendUrlImages}${logo}`} alt={title} className="conference-logo" /> : <span className="icon icon-ticket"></span>}
                </div>
            </div>
            <div className="price-box">
                <div className="title">{title}</div>
                <h4 className="price">{price_type}</h4> 

                <h4 className="price">${price}</h4>
            </div>
            <ul className="features">
                <li>{description}</li> 
            </ul>
            <div className="btn-box">
                <Link to={`/registertype`} className="theme-btn">Register</Link>
            </div>
        </div>
    );
};

export default SinglePriceV1;
