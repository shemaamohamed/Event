import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const SingleFeatureV1 = ({ feature }) => {
    const { icon, title, text ,text1  } = feature

    return (
        <>
            <div className="inner-box">
                <div className="icon-box"><span className={`icon ${icon}`}></span></div>
                <h4><Link to="/about-us#">{title}</Link></h4>
                <div className="text">{text}</div>
                <div className="text">{text1}</div>

            </div>
        </>
    );
};

export default SingleFeatureV1;