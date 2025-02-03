import React from 'react';
import CountUp from 'react-countup';

const SingleFactV1 = ({ fact }) => {
    const { icon, end, info, animation, delay } = fact

    return (
        <>
                <div className="count-box">
                    <span className={`icon ${icon}`}>
                        <img src={`../../assets/images${icon}`} alt="icon"
                         />
                    </span>
                    <span className="count-text">
                        +<CountUp duration={3} end={end} enableScrollSpy />
                    </span>
                    <h4 className="counter-title">{info}</h4>
                </div>
        </>
    );
};

export default SingleFactV1;