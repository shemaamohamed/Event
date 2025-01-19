import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const SinglePriceV3 = ({ plan }) => {
    const { title, price, featureList1, featureList2, featureList3, btnClass, btnText, animationName } = plan

    return (
        <>
                <div className="inner-box">
                    <div className="title">{title}</div>
                    <h4 className="price">${price}</h4>
                    <ul className="features">
                        <li>{featureList1}</li>
                        <li>{featureList2}</li>
                        <li>{featureList3}</li>
                    </ul>
                    <div className="btn-box">
                        <Link to="/login#" className={btnClass}><span
                            className="btn-title">{btnText}</span></Link>
                    </div>
                </div>
        </>
    );
};

export default SinglePriceV3;