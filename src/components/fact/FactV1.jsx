import React from 'react';
import CountUp from 'react-countup';
import Meetingsandconferences from'./Meetingsandconferences.png';
import Exhibitions from'./Exhibitions.png';
import YearsofExperiance from'./YearsofExperiance.png';
import Workshops from'./Workshops.png';


const FactV1 = () => {
   
    return (
        <>
            <section className="fun-fact-section">
                <div className="auto-container">
                    <div className="fact-counter">
                        <div className="row clearfix">
                            
                        <div className={`counter-column col-lg-3 col-md-6 col-sm-12`}>
                            <div className="count-box">
                        <img src={Meetingsandconferences} className='icon' alt="icon"
                        width="100px" height="100px"
                         />
                    <span className="count-text">
                        +<CountUp duration={3} end={200} enableScrollSpy />
                    </span>
                    <h4 className="counter-title">Meetings and Conferences</h4>
                </div>


                        </div>
                         <div className={`counter-column col-lg-3 col-md-6 col-sm-12`}>
                         <div className="count-box">
                     <img src={Exhibitions} className='icon' alt="icon"
                     width="100px" height="100px"
                      />
                 <span className="count-text">
                     +<CountUp duration={3} end={100} enableScrollSpy />
                 </span>
                 <h4 className="counter-title">Exhibitions</h4>
             </div>


                     </div>
                     <div className={`counter-column col-lg-3 col-md-6 col-sm-12`}>
                            <div className="count-box">
                        <img src={YearsofExperiance} className='icon' alt="icon"
                        width="100px" height="100px"
                         />
                    <span className="count-text">
                        +<CountUp duration={3} end={15} enableScrollSpy />
                    </span>
                    <h4 className="counter-title">Years of Experience in Jordan</h4>
                </div>


                        </div>
                        <div className={`counter-column col-lg-3 col-md-6 col-sm-12`}>
                            <div className="count-box">
                        <img src={Workshops} className='icon' alt="icon"
                        width="100px" height="100px"
                         />
                    <span className="count-text">
                        +<CountUp duration={3} end={30} enableScrollSpy />
                    </span>
                    <h4 className="counter-title">Workshops</h4>
                </div>


                        </div>
                       
                      </div>
                </div>
            </div>
            </section>
        </>
    );
};

export default FactV1;