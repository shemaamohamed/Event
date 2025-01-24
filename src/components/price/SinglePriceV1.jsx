import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { backendUrlImages } from '../../constant/config';
import "./style.scss"
const SinglePriceV1 = ({ plan }) => {
    
    const icon = "icon icon-ticket";  // مثال، يمكنك تخصيص الأيقونة حسب السعر أو نوعه

    return (
        <div className="inner-box">
            {/* <div className="icon-box">
                <div className="icon-outer"><span className={icon}></span></div>
            </div> */}
                  <div className="icon-box">
                <div className="icon-outer">
                    <img src={`../images/background/${plan.image}`} alt={plan.title} className="conference-logo" /> 
                </div>
            </div>
            <div className="price-box">
                <div className="title">{plan.title}</div>
                {/* <h4 className="price">{price_type}</h4> 

                <h4 className="price">${price}</h4> */}
            </div>
            {/* <ul className="features">
                <li>{description}</li> 
            </ul> */}
            <div className="btn-box">
                <Link to={`/${plan.btnLink}`} className="theme-btn">{plan.btnText}</Link>
            </div>
        </div>
    );
};

export default SinglePriceV1;
