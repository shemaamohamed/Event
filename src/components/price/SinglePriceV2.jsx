import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const SinglePriceV2 = ({ price }) => {
    

    return (
        <>
                <div className="inner-box">
                    <div className="price-box">
                        <h4 className="price">{price?.price} {price?.price_type}</h4>
                    </div>
                    <div className="title">{price?.description}</div>

                    {!localStorage.getItem("token") && (
                        <div className="btn-box">
                        <Link to="/registertype" className="theme-btn btn-style-one"><span className="btn-title">Register</span></Link>
                    </div>
             
            )}
                   
                    
                </div>
        </>
    );
};

export default SinglePriceV2;