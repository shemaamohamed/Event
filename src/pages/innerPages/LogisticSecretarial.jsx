import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import LogisticSecretarialDetails from '../../components/services/LogisticSecretarialDetails';

const LogisticSecretarial = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Logistic Secretarial Services" breadCrumb="Logistic Secretarial Services"  name={'LogisticSecretarialBackground.png'}/>
                <LogisticSecretarialDetails />
            </div>
        </>
    );
};

export default LogisticSecretarial;