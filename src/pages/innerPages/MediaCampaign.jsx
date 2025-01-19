import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import MediaCampaignDetails from '../../components/services/MediaCampaignDetails';

const MediaCampaign = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Media Campaign" breadCrumb="Media Campaign"  name={'MediaCampaignBackground.png'}/>
                <MediaCampaignDetails />
            </div>
        </>
    );
};

export default MediaCampaign;