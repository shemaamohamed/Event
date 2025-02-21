import React from 'react';
import travel from "./travel.mp4"

const TravelConsultantDetails  = () => {

    return (
        <>
            <section className="event-detail">
                <div className="auto-container">
                   
                    <div className="content-box">
                        
                        <h2>Travel & Tourism Services</h2>

                        <p>
                            At Event Consultant, we specialize in providing comprehensive travel and tourism services that are tailored to meet the unique needs of our clients. As an experienced events consulting company, we understand the importance of seamless travel experiences for both corporate groups and individuals attending events, conferences, or leisure trips. Our goal is to ensure smooth, efficient, and enjoyable travel experiences, so you can focus on what matters most.
                        </p>
                        <video controls width="100%" height="auto">
    <source src={travel} type="video/mp4" />
  </video>

                        <h3>Our Services Include:</h3>
                        <ul className="list-style-two">
                            <li><strong>Corporate Travel Management:</strong> We offer end-to-end travel solutions for businesses, from organizing flights and accommodations to managing group transportation. Our team ensures cost-effective, efficient travel for your employees, speakers, or clients attending conferences, seminars, and corporate events.</li>
                            <li><strong>Leisure & Group Travel Planning:</strong> Whether it's a group incentive trip or a corporate retreat, we handle all aspects of leisure travel. From personalized itineraries to exclusive group activities and hotel bookings, we ensure that every aspect of the trip is tailored to your group's needs.</li>
                            <li><strong>Destination Management:</strong> We provide detailed destination planning and logistics, from selecting the ideal location to arranging tours and excursions. Our extensive knowledge of various regions ensures that each trip is enriched with local experiences that are both memorable and impactful.</li>
                            <li><strong>Transportation Services:</strong> Whether you need airport transfers, shuttle services, or private transportation, we offer a variety of options that guarantee timely and comfortable travel for your guests.</li>
                            <li><strong>Accommodation Coordination:</strong> We assist in selecting the best hotels and resorts to match your budget and preferences, ensuring your attendees enjoy a comfortable stay during their trip. We also handle group bookings, special requests, and room assignments.</li>
                            <li><strong>Visa and Travel Documentation Assistance:</strong> We guide you through the visa application process and assist with all necessary travel documentation, ensuring that all legal requirements are met for both domestic and international travel.</li>
                            <li><strong>On-Site Support and Concierge Services:</strong> From airport pickups to in-destination support, our team provides personalized concierge services to ensure that every aspect of the journey is smooth and hassle-free. We are always available to assist with any on-site needs or emergencies.</li>
                        </ul>

                        <h3>Why Choose Us?</h3>
                        <ul className="list-style-two">
                            <li><strong>Expert Knowledge and Experience:</strong> With years of experience in the travel and events industry, we understand the nuances of organizing flawless travel experiences, whether for corporate events, conferences, or leisure trips.</li>
                            <li><strong>Customized Solutions:</strong> Every trip is different, which is why we work closely with our clients to create tailored travel plans that match their exact requirements, preferences, and budgets.</li>
                            <li><strong>Reliable Partnerships:</strong> We have established strong relationships with global travel providers, ensuring competitive pricing, high-quality service, and preferential treatment for our clients.</li>
                            <li><strong>Seamless Experience:</strong> We manage all aspects of travel logistics to create a hassle-free, enjoyable experience. Our team handles every detail, allowing you to focus on your primary objectives.</li>
                        </ul>

                        <p>
                            Whether you're planning a corporate conference, a team-building retreat, or a group leisure trip, we are committed to delivering exceptional travel services that exceed your expectations. Let us handle the logistics so you can focus on the event at hand.
                        </p>

                        <p>
                            Contact us today to discuss your travel and tourism needs, and let us help you create a seamless and memorable experience.
                        </p>

                    </div>
                </div>
            </section>
        </>
    );
};

export default TravelConsultantDetails;
