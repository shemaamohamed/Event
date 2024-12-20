import React, { useEffect } from 'react';
import { Box, Grid, Typography, ListItemText, ListItemIcon, ListItem, List, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Using Material-UI icon for consistency
import AOS from 'aos';
import 'aos/dist/aos.css';

const Expositions = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-out' });
    }, []);

    const points = [
        "Events consultant is specialized in organizing Medical, Tourism and Scientific Exhibitions. To prepare and realize successful exhibitions a skillful organizing support is essential.",
        "Our staff offers to associations, ministries, academies, institutions and foundations all the services which are necessary to organize exhibitions satisfying every standard. We support our clients in the research and choice of the best locations.",
        "We are experienced in the demanding marketing, promoting and public relations activities and the creation of typographic material and posters which communicate a strong image.",
        "Events consultant also proposes creative solutions and the best locations for related events such as workshops, seminars and openings and gala evenings.",
        "We can also include among the options of the event a multimedia room, meeting rooms, bookshop, and coffee area and cyber locations.",
    ];

    const backgroundImage = "/image/Expositionsbackground.png";

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${backgroundImage})`,
                    height: { xs: "50vh", md: "50vh" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 4,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: '#c62828',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        padding: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: '5px',
                    }}
                    data-aos="fade-up"
                >
                    Expositions & Exhibitions
                </Typography>
            </Box>

            <Container maxWidth="md" sx={{ py: 5 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <List>
                            {points.map((point, index) => (
                                <ListItem
                                    key={index}
                                    disablePadding
                                    sx={{
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: '36px', color: '#c62828', mt: 0.5 }}>
                                        <CheckCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="body1"
                                                sx={{ fontSize: '1.2rem', lineHeight: 1.8 }}
                                            >
                                                {point}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Expositions;
