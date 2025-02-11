import React from 'react';
import SocialShare from '../others/SocialShare';
import MamounImage from './image/Mamoun.png';


const SpeakerInfo = () => {

    return (
        <>
                         <section className={`pricing-section-two ${"alternate"}`}>

            <section className="speaker-detail"
           
            >
   
          <div className="anim-icons">
                  <span className="icon icon-circle-1"></span>
                  <span className="icon icon-dots"></span>
          </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="image-column col-lg-3 col-md-12 col-sm-12"
                        style={{
                            display:'flex',
                            justifyContent:'center'
                        }}
                        >
                            <div className="image-box"
                            style={{
                                width:'250px'
                            }}
                            >
                                <figure className="image"
                                style={{
                                    border:"none",
                                    boxShadow:"none"
                                }}
                                ><img src={MamounImage} alt="image" /></figure>
                               
                            </div>
                        </div>
                        <div className="info-column col-lg-9 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="text-box">
                                    <h3>Dear Valued Clients,</h3>
                                    <p>Welcome to Events Consultant Co., a space where innovation, professionalism, and passion come together to redefine the world of events management. My name is Mamoun Khraisheh, and it is my honor to share with you the story and vision behind our company.</p>
                                  
                                 
                                    <p>Years ago, I envisioned creating a company that would set a new benchmark in events management. I wanted to go beyond traditional planning, incorporating creativity and cutting-edge technology to deliver memorable experiences for our clients. This vision led to the establishment of Events Consultant Co., a company born out of passion and a relentless drive for excellence.</p>
                                    <p>From the beginning, our mission has been clear: to offer world-class event solutions tailored to meet the unique needs of each client. We have continually invested in upgrading our systems, integrating advanced tools, and utilizing the latest technological advancements to streamline processes, enhance creativity, and deliver flawless events.</p>
                                    <p>At Events Consultant Co., we are committed to staying ahead of industry trends. Our team continuously innovates and evolves to ensure that every event we manage is not only successful but also exceeds expectations. My approach has always been centered on fostering a culture of collaboration, encouraging our team to think outside the box, and empowering them with the tools and resources they need to thrive in an ever-changing industry.</p>
                                    <p>Our journey has been one of growth and transformation, and I am proud of how far we have come. But the journey does not end here. My goal is to keep elevating Events Consultant Co. to new heights, always with our clients’ satisfaction at the heart of everything we do.</p>
                                    <p>Thank you for your trust and support. I invite you to explore our website, learn more about our services, and see how we can bring your vision to life. Together, we can create unforgettable experiences.</p>

                                    <p>Warm regards,
                                        <br />
                                        <b>Mamoun Khraisheh</b>
                                        <br />

                                        <span
                                        style={{
                                            color: ' #9B1321',
                                        }}
                                        >Founder & CEO, Events Consultant Co.</span>
                                    </p>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </section>
        </>
    );
};

export default SpeakerInfo;