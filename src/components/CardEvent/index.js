import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import './style.scss';

const Cardd = ({
  imageUrl,
  title,
  description,
  seeMoreLink,
  galleryLink,
  buttonText = 'See More',
  galleryButtonText = 'View Gallery',
}) => {
  const handleSeeMore = () => {
    window.open(seeMoreLink, '_blank'); // Open the external link in a new window
  };

  return (
    <Card
      sx={{
        width: 345,  // Fixed width for all cards
        height: 500, // Fixed height for all cards
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column', // Ensures vertical stacking of image and content
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"  // Fixed height for images to make them uniform
          image={imageUrl}
          alt="card image"
          sx={{
            objectFit: 'cover', // Ensures the image covers the area without distortion
          }}
        />
        {galleryLink && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,
              padding: '8px 16px',
              borderRadius: '20px',
            }}
            onClick={() => window.open(galleryLink, '_blank')}
          >
            {galleryButtonText}
          </Button>
        )}
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 'bold',
            marginBottom: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden', // Prevent title overflow
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 2,
            flexGrow: 1,  // Allow the description to take available space
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,  // Limit the description to 3 lines
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
        {seeMoreLink && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleSeeMore}
            sx={{
              padding: '8px',
              textTransform: 'capitalize',
              fontSize: '0.875rem',
            }}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Cardd;
