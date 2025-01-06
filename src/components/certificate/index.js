import React, { useState, useEffect } from "react";
import { useAuth } from "../../common/AuthContext";
import { backendUrlImages } from "../../constant/config";
import SimpleLabelValue from "../SimpleLabelValue";
import "./style.scss";

const Certificate = () => {
  const { certificatePDF } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (certificatePDF) {
      setLoading(false);
    }
  }, [certificatePDF]);

  const onLoadError = () => {
    setError("Failed to load PDF.");
    setLoading(false);
  };

  return (
    <div className="certificate-form">
      <h2 className="certificate-header">Certificate</h2>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : certificatePDF ? (
        <div className="certificate-link">
          <a
            href={`${backendUrlImages}${certificatePDF}`}
            target="_blank"
            rel="noopener noreferrer"
            className="certificate-link-text"
          >
            <span className="pdf-icon">&#x1F4C4;</span> View PDF
          </a>
        </div>
      ) : (
        <div className="error-message">
          <p>No certificate available</p>
        </div>
      )}

      {/* PDF Viewer Section */}
      {certificatePDF && !loading && !error && (
        <div className="pdf-viewer">
          <iframe
            src={`${backendUrlImages}${certificatePDF}`}
            title="Certificate PDF"
            width="100%"
            height="200px"
            onError={onLoadError}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Certificate;
