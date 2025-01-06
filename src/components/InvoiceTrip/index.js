import React, { useState, useEffect, Fragment } from "react";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";

const InvoiceTrip = () => {
  const [participantsData, setParticipantsData] = useState([]);
  const { participantId, name } = useParams();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const fetchParticipants = async () => {
    if (!participantId) return;
    try {
      await httpService({
        method: "GET",
        url: `${BASE_URL}/invoice/trip/${participantId}`,
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (response) => {
          if (response.success && response.data) {
            setParticipantsData(response.data);
          }
        },
        withToast: false,
      });
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [participantId]);

  return (
    <Fragment>
      <div className="invoice-trip-user">
        <h1 className="tititi">Trip Invoice</h1>
        {participantsData.length > 0 ? (
          participantsData.map((participant) => (
            <div key={participant.id} className="participant-data">
              <SimpleLabelValue label="Name" value={name} />
              <SimpleLabelValue label="ID" value={participant.id} />
              <SimpleLabelValue
                label="Participant ID"
                value={participant.participant_id}
              />
              <SimpleLabelValue
                label="Base Price"
                value={`$${participant.base_price}`}
              />
              <SimpleLabelValue
                label="Options Price"
                value={`$${participant.options_price}`}
              />
              <SimpleLabelValue
                label="Total Price"
                value={`$${participant.total_price}`}
              />
              <SimpleLabelValue
                label="Created At"
                value={new Date(participant.created_at).toLocaleString()}
              />
              <SimpleLabelValue
                label="Updated At"
                value={new Date(participant.updated_at).toLocaleString()}
              />
              <SimpleLabelValue label="Status" value={participant.status} />
            </div>
          ))
        ) : (
          <p>No participant data available.</p>
        )}
      </div>
    </Fragment>
  );
};

export default InvoiceTrip;
