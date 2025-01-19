import React, { useState, useEffect, Fragment } from "react";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import httpService from "../../common/httpService";
import "./style.scss";

const Invoce = ({ isInvoiveOpen, setInvoiveOpen, participantIds }) => {
  const [data, setData] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const TOKEN = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await httpService({
        method: "POST",
        url: `${BASE_URL}/user/invoice/trip`,
        data: { participantIds },
        headers: { Authorization: `Bearer ${TOKEN}` },
        onSuccess: (response) => {
          console.log(response);

          setData(response);
        },
        withToast: false,
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [participantIds, isInvoiveOpen]);

  return (
    <Fragment>
      <div className="participants-component2">
        <MySideDrawer isOpen={isInvoiveOpen} setIsOpen={setInvoiveOpen}>
          {data.length > 0 ? (
            data?.map((participant) => (
              <div key={participant.id}>
                <SimpleLabelValue
                  label="Name"
                  value={`Participant ID: ${participant.participant_id}`}
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
                  label="Total Price(USD)"
                  value={`$${participant.total_price}`}
                />
                <SimpleLabelValue label="Status" value={participant.status} />
                <SimpleLabelValue
                  label="Created At"
                  value={new Date(participant.created_at).toLocaleString()}
                />
                <SimpleLabelValue
                  label="Updated At"
                  value={new Date(participant.updated_at).toLocaleString()}
                />
              </div>
            ))
          ) : (
            <p>No participants data available.</p>
          )}
        </MySideDrawer>
      </div>
    </Fragment>
  );
};

export default Invoce;
