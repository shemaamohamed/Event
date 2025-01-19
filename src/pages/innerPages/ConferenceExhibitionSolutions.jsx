import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import ConferenceExhibitionSolutionsDetails from '../../components/services/ConferenceExhibitionSolutionsDetails';

const ConferenceExhibitionSolutions = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Conference Exhibition Solutions" breadCrumb="Conference Exhibition Solutions"  name={'ConferenceExhibitionSolutionsBackground.png'}/>
                <ConferenceExhibitionSolutionsDetails />
            </div>
        </>
    );
};

export default ConferenceExhibitionSolutions;