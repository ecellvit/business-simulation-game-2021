import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";


import "./landingComponents.css";
import illus1 from "../../resources/images/illus1.jpg";
import eventDate from "../../resources/images/eventDate.svg";

function EventDate() {
  return (
    <>
      <img src={eventDate} alt={"December 4th"} />
    </>
  );
}

function DaysLeft() {
  return (
    <>
      <Grid item container className="section1-text" xs>
        Registrations closing in
        <div class="daysLeftDate1">27</div>
        <div class="daysLeftDate2">DAYS</div>
      </Grid>
    </>
  );
}

export function Section1() {
  return (
    <Box
      display="flex"
      className="section1-MainContainer"
      sx={{
        flexFlow: {
          xs: "column-reverse",
          sm: "row-reverse",
          md: "row",
        },
      }}
    >
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{
          width: {
            xs: "100%",
            sm: "50%",
            md: "50%",
          },
        }}
      >
        <Grid item className="section1-head">
          FuturePreneurs
        </Grid>
        <Grid item className="section1-text">
          <Typography>
            Put Yourself In The Shoes Of A CEO And Conquer The Challenges Ahead
            Of You. Take A Glance At What It’s Like To Be A Part Of A Startup
            And Dive Into The World Of Business With Our Annual, Wildly Popular
            GraVITas Event.
          </Typography>
        </Grid>

        <Grid
          item
          container
          flexFlow="row"
          xs
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item  className="eventDate" xs={3}>
            <EventDate />
          </Grid>

          <Grid item>
            <div
              style={{
                height: "100px",
                width: "3px",
                backgroundColor: "#2D3A3A",
                borderRadius: "10px",
              }}
            />
          </Grid>

          <Grid item container xs={2}>
            <DaysLeft />
          </Grid>
        </Grid>

        <Grid item container xs justifyContent="flex-end" width="80%">
          <Grid item>
            <Box className="registerButton"><Link to="/Login" style={{color:"white",textDecoration:"none"}}>Register Now</Link></Box>
          </Grid>
        </Grid>
      </Grid>

      <Box
        class="illusContainer"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={illus1} alt={"illustration"} />
      </Box>
    </Box>
  );
}
