import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const SelectConferences = () => {
  const [allConferences, setAllConferences] = useState([]);
  const [conferenceName, setConferenceName] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const currentPath = location.pathname;
  const isAttendance = currentPath === "/registerPage/attendance";
  const getConference = () => {
    const searchQuery = conferenceName
      ? `?search=${encodeURIComponent(conferenceName)}`
      : "";
    const url = `${BaseUrl}/con/upcoming`;

    axios
      .get(url)
      .then((response) => {
        setAllConferences(response.data.upcoming_conferences);
      })
      .catch((error) => {
        console.error("Error fetching conferences", error);
      });
  };

  useEffect(() => {
    getConference();
    console.log(currentPath);
  }, [conferenceName]);

  const handleTitleClick = (conferenceId) => {
    if (isAttendance) return;
    const currentPath = location.pathname;
    const paths = {
      "/registerPage/attendance": `/register/attendance/${conferenceId}`,
      "/registerPage/speaker": `/register/speaker/${conferenceId}`,
      "/registerPage/group": `/register/group/${conferenceId}`,
      "/registerPage/sponsor": `/register/sponsor/${conferenceId}`,
    };
    navigate(paths[currentPath] || currentPath);
  };
  const handleAttendanceClick = (conferenceId, type) => {
    navigate(`/register/attendance/${conferenceId}/${type}`);
  };

  return (
    <div className="conferences">
      <h1 className="title">Available Conferences</h1>
      <ul className="conference-list">
        {allConferences?.map((conference) => (
          <li key={conference.id} className="conference-item">
            <h2 onClick={() => handleTitleClick(conference.id)}>
              {conference.title}
            </h2>
            {isAttendance && (
              <ul className="prices-list">
                {conference.prices.map((price) => (
                  <li
                    key={price.id}
                    className={`price-item ${
                      selectedPriceId === price.id ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleAttendanceClick(conference.id, price.price_type)
                    }
                  >
                    <div className="price-type">{price.price_type}</div>
                    <div className="price-amount">${price.price}</div>
                    <div className="price-description">{price.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectConferences;
