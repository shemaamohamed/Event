import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ContactPageContent from '../../components/contact/ContactPageContent';

const Contact = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Contact Us" breadCrumb="contact"  name={'Contact.png'}/>
                <ContactPageContent />
            </div>
        </>
    );
};

export default Contact;