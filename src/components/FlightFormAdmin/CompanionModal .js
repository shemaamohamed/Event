import React from "react";
import MySideDrawer from "../../CoreComponent/SideDrawer";
import SimpleLabelValue from "../SimpleLabelValue";
import CustomFormWrapper from "../../CoreComponent/CustomFormWrapper";
import "./CompanionModal.scss";
import { Drawer, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { backendUrlImages } from "../../constant/config";

const FlightDetails = ({ flights }) => {
  console.log({ flights });

  if (!flights?.length) return;
  const flightsToDisplay = flights?.slice(1);
  return (
    <div className="FlightDetails">
      {flightsToDisplay?.map((flight, index) => (
        <div>
          <div className="head"> companion {index + 1} </div>
          <div key={flight.flight_id} className="FlightDetails-section">
            <SimpleLabelValue
              label="Passport Image"
              value={
                flight?.passportImage ? (
                  <a
                    href={`${backendUrlImages}${flight?.passportImage}`}
                    download
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    Available (Click to download)
                  </a>
                ) : (
                  "Not Provided"
                )
              }
            />

            <SimpleLabelValue
              label="Departure Airport"
              value={flight.departure_airport || "-"}
            />
            <SimpleLabelValue
              label="Arrival Airport"
              value={flight.arrival_airport || "-"}
            />
            <SimpleLabelValue
              label="Departure Date"
              value={flight.departure_date || "-"}
            />
            <SimpleLabelValue
              label="Arrival Date"
              value={flight.arrival_date || "-"}
            />
            <SimpleLabelValue
              label="Flight Number"
              value={flight.flight_number || "-"}
            />
            <SimpleLabelValue
              label="Seat Preference"
              value={flight.seat_preference || "-"}
            />
            <SimpleLabelValue
              label="Upgrade Class"
              value={flight.upgrade_class || "-"}
            />
            <SimpleLabelValue
              label="Ticket Count"
              value={flight.ticket_count || "-"}
            />
            <SimpleLabelValue
              label="Additional Requests"
              value={flight.additional_requests || "-"}
            />
            <SimpleLabelValue
              label="Passenger Name"
              value={flight.passenger_name || "-"}
            />
            <SimpleLabelValue
              label="Admin Update Deadline"
              value={flight.admin_update_deadline || "Not Set"}
            />
            <SimpleLabelValue
              label="Is Free"
              value={flight.is_free ? "Yes" : "No"}
            />
            <SimpleLabelValue
              label="Ticket Number"
              value={flight.ticket_number || "Not Assigned"}
            />

            <SimpleLabelValue
              label="Specific Flight Time"
              value={flight.specific_flight_time || "-"}
            />
            <SimpleLabelValue
              label="Base Ticket Price"
              value={flight.base_ticket_price || "Not Set"}
            />
            <SimpleLabelValue
              label="Accepted Flights"
              value={
                <p>
                  <a
                    href={`${backendUrlImages}${flight.flightFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                {flight.flightFile ? "View File" : "-"}
                </a>
                </p>
              }
            />
          </div>{" "}
        </div>
      ))}
    </div>
  );
};
const CompanionModal = ({ isOpen, setIsOpen, companions, headers }) => {
  return (
    <>
      <Drawer
        anchor="right"
        sx={{
          //width
          zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements

          "& .MuiDrawer-paper": {
            zIndex: (theme) => theme.zIndex.modal + 1,

            width: {
              xs: "100%",
              sm: "50%",
              md: "50%",
              lg: "40%",
              xl: "40%",
            },
          },
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseRounded />
          </IconButton>
        </div>
        <CustomFormWrapper
          title="Companions Information"
          handleSubmit={() => {}}
          setOpenForm={setIsOpen}
          noActions={true}
        >
          <FlightDetails flights={companions} />
        </CustomFormWrapper>
      </Drawer>
      <MySideDrawer isOpen={isOpen} setIsOpen={setIsOpen}></MySideDrawer>
    </>
  );
};

export default CompanionModal;
