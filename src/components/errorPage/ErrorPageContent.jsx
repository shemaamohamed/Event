import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const ErrorPageContent = () => {
    return (
        <>
            <section className="error-section">
                <div className="anim-icons full-width">
                    <span className="icon icon-circle-blue wow fadeIn"></span>
                    <span className="icon icon-dots wow fadeInleft"></span>
                    <span className="icon icon-line-1 wow zoomIn"></span>
                        <span className="icon icon-circle-1"></span>
                </div>
                <div className="auto-container">
                    <div className="error-title">404</div>
                    <h4>Page not Found</h4>
                    <div className="text">Sorry, we couldnt find the page youre looking for</div>
                    <Link to="/#" className="theme-btn btn-style-three"><span className="btn-title">Home Page</span></Link>
                    <Link to="/contact_us#" className="theme-btn btn-style-two"><span className="btn-title">Contact Us</span></Link>
                </div>
            </section>
        </>
    );
};

export default ErrorPageContent;