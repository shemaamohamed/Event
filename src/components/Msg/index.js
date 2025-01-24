import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Grid, Card, CardContent, Typography, Alert } from "@mui/material";


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // استبدلها بالتوكن المناسب
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BaseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setMessages(response.data.messages.reverse());
      })
      .catch(error => {
        setError('Failed to fetch messages. Please try again later.');
      });
  }, [BaseUrl, token]);

  // دالة لعرض الحقول فقط إذا كانت قيمتها موجودة وليست null أو فارغة
  const renderField = (label, fieldValue) => {
    if (fieldValue && (typeof fieldValue === 'string' ? fieldValue.trim() !== "" : true)) {
      return (
        <p><strong>{label}:</strong> {fieldValue}</p>
      );
    }
    return null; // إرجاع null إذا لم يكن هناك قيمة
  };

  return (
    <div className="messages-container">
      <h2
      sx={{
        color:'#9B1321'
      }}
      >Messages</h2>
      {error && <p className="error-message">{error}</p>}
      {messages.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No messages available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {messages.map((msg) => (
            <Grid item xs={12}  key={msg.id}>
              <Card variant="outlined">
                <CardContent>
                  {renderField("Subject", msg.subject)}
                  {renderField("Name", msg.name)}
                  {renderField("Email", msg.email)}
                  {renderField("Phone", msg.phone)}
                  {renderField("Company Name", msg.companyName)}
                  {renderField("Event Name", msg.eventName)}
                  {renderField("Event Type", msg.eventType)}
                  {renderField("Preferred Date", msg.preferredDate)}
                  {renderField("Event Duration", msg.eventDuration)}
                  {renderField("Expected Attendees", msg.expectedAttendees)}
                  {renderField("Venue Location", msg.venueLocation)}
                  {renderField("Has Venue", msg.hasVenue)}
                  {renderField("Venue Name", msg.venueName)}
                  {renderField("Services Required", msg.servicesRequired)}
                  {renderField("Additional Comments", msg.additionalComments)}
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginTop: "8px", display: "block",
                      color: "#9B1321"
                     }}
                  >
                    Sent at: {new Date(msg.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Messages;
