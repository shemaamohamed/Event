import React from 'react';
import CountUp from 'react-countup';

const SingleFactV2 = ({ fact }) => {
    const { animation, icon, end, title, delay } = fact

    return (
        <>
                <div className="counter-column col-lg-3 col-md-6 col-sm-12">
                    <div className="count-box">
                        <span className={icon}></span>
                        <span className="count-text">
                            <CountUp end={end} enableScrollSpy duration={5} />
                        </span>
                        <h4 className="counter-title">{title}</h4>
                    </div>
                </div>
        </>
    );
};

export default SingleFactV2;