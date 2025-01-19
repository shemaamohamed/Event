import React, { useEffect, useState } from "react";
import "./style.scss";
import welcomeImage from "./welcome.jpeg"; // Import the image properly
import httpService from "../../../common/httpService";
import { useParams } from "react-router-dom";
import { backendUrlImages } from "../../../constant/config";

const Welcome = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;;
  const { conferenceId } = useParams();
  const [info, setInfo] = useState(null);

  const getWelcomeData = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    try {
      await httpService({
        method: "GET",
        url: `${BaseUrl}/conferences/${conferenceId}/welcome-message`,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        showLoader: true,

        onSuccess: (data) => {
          console.log({ hedaya: data });
          setInfo(data)
          // const tt= {
          //       "id": 1,
          //       "conference_id": 2,
          //       "welcome_message": "yyyyyyyyyyyyyyyy",
          //       "president_image": "ENka8iils4HAFOzbpCsfxai0uJertLGedlVr8GPS.jpg",
          //       "conference_logo": "7gEwG452456Qxb8r1MXdNt8fz7nPtSBf6LniJ2iO.jpg",
          //       "cooperating_associations_logo": "hYDKWgD8V2Lf1Q9n23051LsX8Kw06yS2tEye7dtD.jpg",
          //       "created_at": "2025-01-19T15:15:51.000000Z",
          //       "updated_at": "2025-01-19T15:15:51.000000Z"
          // }
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  useEffect(() => {
    getWelcomeData()
  }, [])
  return (
    <div className="welcome-container-section2">
      <div className="welcome-container">
        <div className="welcome-header">
          <h3>Welcome to the Conference!</h3>
          <h4>
            On behalf of the Organizing Committee, we are excited to invite you
            to join us at this prestigious conference, bringing together experts
            and professionals from around the world. The event will be held in
            a dynamic and welcoming city, offering a platform for collaboration,
            innovation, and knowledge exchange.
          </h4>
        </div>

        <div className="welcome-content">
          <div
            className="welcome-image"
          // style={{ backgroundImage: `url(${welcomeImage})` }} // Set background image correctly
          >
            <img src={`${backendUrlImages}conference_images/${info?.president_image}`} />


          </div>

          <div className="welcome-description">
            <p>
              {info?.welcome_message}
            </p>

            <p>
              <strong>Chairman of the Conference</strong>
            </p>
          </div>
        </div>

        <div className="topics-section">
          <img src={`${backendUrlImages}conference_logos/${info?.conference_logo
            }`} />
          <h1>In collaboration with</h1>
          <img src={`${backendUrlImages}cooperating_associations_logo/${info?.
            cooperating_associations_logo

            }`} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
