import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography, ListItemText, ListItemIcon, ListItem, List } from '@mui/material'; // Import Material-UI components
import './style.scss'; 
import { CheckCircleIcon } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Conference3 = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            easing: 'ease-out', 
            once: true, 
        });
    }, []);

    return (
        <>
            <Box
                sx={{
                    minWidth: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    backgroundImage: {
                        xs: "url('/image/confbackground1.png')",
                        sm: "url('/image/confbackground1.png')",
                        md: "url('/image/confbackground1.png')",
                    },
                    height: {
                        xs: "50vh",
                        sm: "70vh",
                        md: "50vh",
                        lg: "50vh",
                        xl: "50vh",
                    },
                    padding: { xs: 2, md: 5 },
                    mb: 4, 
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                    }}
                    data-aos="fade-up"

                >
                    Conferences & Events
                </Typography>
            </Box>

            <Grid
                sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                }}
                container
                spacing={4}
                px={{ xs: 2, md: 5 }}
            >
                <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{ padding: { xs: 2, md: 4 } }}
                >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#c62828' }}>
                        Why Choose Our Conference Services
                    </Typography>
                    <List sx={{ listStyleType: 'none', padding: 0 }}>
                        <ListItem
                            disablePadding
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'row',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '36px', color: '#c62828' }}>
                                <CheckCircleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                        Conferences have traditionally provided opportunities for networking, socializing, and hearing the latest management speak. But they have rarely been exploited to their full potential as a forum for creative problem-solving and for mobilizing delegates into meaningful action.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            disablePadding
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'row',
                            }}

                        >
                            <ListItemIcon sx={{ minWidth: '36px', color: '#c62828' }}>
                                <CheckCircleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                        The stage setting for any conference is critical to the reception of the message. Set design, lighting, quality of sound, and projection all contribute to communication.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            disablePadding
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'row',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '36px', color: '#c62828' }}>
                                <CheckCircleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                        Our very skilled staff carefully provides for all phases of a conference, such as planning, preparation, and management. Our knowledge, based on years of experience in the field of events management, allows us to use resources in the best way possible for successful results.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            disablePadding
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'row',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '36px', color: '#c62828' }}>
                                <CheckCircleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                        A strong engagement in public relations, marketing, and promotion is mandatory for attracting and keeping participants. This includes contacting newspapers, preparing press releases, organizing press conferences, creating websites, and designing brochures and posters.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            disablePadding
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'row',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '36px', color: '#c62828' }}>
                                <CheckCircleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                        We have a wide range of contacts with the best suppliers, enabling us to offer top-tier services at competitive prices. We constantly seek new and innovative ideas to make our events unique and unforgettable.
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </>
    );
};

export default Conference3;
