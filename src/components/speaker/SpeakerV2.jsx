import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleSpeakerV2 from "./SingleSpeakerV2";
import back from "./6.jpeg"


const SpeakerV2 = ({conferenceId}) => {
    const [speakers, setSpeakers] = useState([]);
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
      axios
        .get(`${BaseUrl}/speakers/all/${conferenceId}`)
        .then((response) => {
          setSpeakers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    return (
        <>
                     <section className="speakers-section" style={{ backgroundImage: `url(${back})` }}>

             <div className="auto-container">
             <div className="sec-title light text-center">
  <h2 style={{ borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>Speakers</h2>
</div>
                    <div className="row">
                        {speakers.map(speaker =>
                            <div className="speaker-block col-lg-4 col-md-6 col-sm-12" key={speaker.id}>
                                <SingleSpeakerV2 speaker={speaker} />
                                



                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SpeakerV2;