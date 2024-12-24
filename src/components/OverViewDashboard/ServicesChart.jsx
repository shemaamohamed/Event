import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const servicesData = [
  { name: 'Conferences', clients: 50 },
  { name: 'Exposition', clients: 30 },
  { name: 'Workshops', clients: 60 },
  { name: 'Seminars', clients: 40 },
  { name: 'Corporate Meetings', clients: 80 },
  { name: 'Event Planning', clients: 100 },
  { name: 'Media Campaigns', clients: 70 },
  { name: 'Logistics', clients: 55 },
  { name: 'Social Events', clients: 90 },
  { name: 'Concept Creation', clients: 65 },
  { name: 'Management Consulting', clients: 120 },
];

const ServicesChart = () => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Services and Clients Count
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={servicesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clients" fill="#c82333" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ServicesChart;
