import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrlImages } from "../../constant/config";
import "./style.scss"
const OneExhibit = () => {
  const { exhibitId } = useParams();
  const [exhibitData, setExhibitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExhibitData = async () => {

    setLoading(true);
    setError(null);
    const BaseUrl = process.env.REACT_APP_BASE_URL;;
    try {
      const response = await axios.get(`${BaseUrl}/exhibition-images/${exhibitId}`);
      setExhibitData(response.data.data);
    } catch (err) {
      setError("Failed to load exhibit details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (exhibitId) {
      fetchExhibitData();
    }
  }, [exhibitId]);

  if (loading) return <p>Loading exhibit details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!exhibitData || exhibitData.length === 0) return <p
  style={{
    marginTop:'20vh',
    textAlign:'center'
  }}
  >No exhibit details available.</p>;

  return (
    <div className="one-exhibit-container" style={{
      marginTop:'20vh',
      padding:'20px'
    }}>
      {exhibitData.map((item, index) => (
        <div key={index} className="exhibit-item">
          <img
            src={`${backendUrlImages}${item.image}`}
            alt={item.alt_text || "Exhibit Image"}
            className="exhibit-image"
          />
          <h3 className="exhibit-title" >{item.conference_title}</h3>
        </div>
      ))}
    </div>
  );
};

export default OneExhibit;
