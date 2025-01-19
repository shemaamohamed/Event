import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ConceptCreationDetails from '../../components/services/ConceptCreationDetails';

const ConceptCreation = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Concept Creation" breadCrumb="Concept Creation"  name={'ConceptCreationBackground.png'}/>
                <ConceptCreationDetails />
            </div>
        </>
    );
};

export default ConceptCreation;