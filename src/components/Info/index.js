import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const MapLogistic = () => {
  return (
    <>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "0px !important",
            alignItems:'flex-end',
            display:'flex',
            flexDirection:'column',
          }}
        >

          <Grid
            size={{ xs: 12,md:12 }}
            style={{
             

              margin:'0px auto',
              height: "500px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54162.63123254484!2d35.860737!3d31.956434999999995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10ff839a7bf%3A0xa854064ff6e1a48b!2zRXZlbnRzIENvbnN1bHRhbnQgY29tcGFueSAtINi02LHZg9ipINin2YTZhdiz2KrYtNin2LEg2YTZhNmF2KTYqtmF2LHYp9iq!5e0!3m2!1sen!2sus!4v1734476822611!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MapLogistic;
