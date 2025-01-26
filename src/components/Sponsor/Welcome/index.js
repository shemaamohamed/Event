import React from "react";
import "./style.scss";
import { Card, CardContent, Typography, Box } from '@mui/material';


const SponsorshipWelcomeMessage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 1}}>
      <Card sx={{   borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ color: '#9B1321', fontWeight: 'bold' }}>
            🎉 Congratulations on Becoming a Sponsor! 🎉
          </Typography>

          <Typography variant="body1" align="center" sx={{ marginTop: 3, lineHeight: 1.6 }}>
            You’ve just taken an incredible step towards making a significant impact at our conference. We are beyond excited to welcome you as one of our sponsors.
          </Typography>

          <Typography variant="body1" align="center" sx={{ marginTop: 2, lineHeight: 1.6, fontStyle: 'italic' }}>
            Your support doesn’t just contribute to the event – it’s a partnership that will shape the future of the industry and leave a lasting legacy. We can’t wait to see what we will achieve together.
          </Typography>

          <Typography variant="body1" align="center" sx={{ marginTop: 2, lineHeight: 1.6 }}>
            Thank you for believing in us and for being a part of this exciting journey. Together, we’re going to make magic happen! ✨
          </Typography>

          <Box sx={{ marginTop: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#9B1321' }}>
              Welcome aboard, and let’s make it unforgettable! 🌟
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SponsorshipWelcomeMessage;
