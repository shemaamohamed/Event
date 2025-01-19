import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import FaqV1 from '../../components/faq/FaqV1';
import FaqForm from '../../components/form/FaqForm';

const Faq = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="faq's" breadCrumb="faq"  name={'SocialEBackground.png'}/>
                <FaqV1 />
                <FaqForm />
            </div>
        </>
    );
};

export default Faq;