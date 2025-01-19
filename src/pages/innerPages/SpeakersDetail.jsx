import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { useParams } from 'react-router-dom';
import SpeakerV1Data from '../../jsonData/speaker/SpeakerV1Data.json'
import SpeakerInfo from '../../components/speaker/SpeakerInfo';
import FluidV1 from '../../components/fluid/FluidV1';
import PriceV3 from '../../components/price/PriceV3';

const SpeakersDetail = () => {

    const { id } = useParams()
    const data = SpeakerV1Data.filter(speaker => speaker.id === parseInt(id))[0]

    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Speaker's Detail" breadCrumb="speakers-detail" />
                <SpeakerInfo speakerInfo={data} />
                <FluidV1 />
                <PriceV3 />
            </div>
        </>
    );
};

export default SpeakersDetail;