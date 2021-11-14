import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./landingComponents.css";
import illus1 from "../../resources/images/illus1.jpg";
import eventDate from "../../resources/images/eventDate.svg";

function EventDate() {
  return (
    <>
      <img src={eventDate} />
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
            sm: "60%",
            md: "50%",
          },
        }}
      >
        <Grid item className="section1-head">
          FuturePreneurs
        </Grid>
        <Grid item className="section1-text">
          Put Yourself In The Shoes Of A CEO And Conquer The Challenges Ahead Of
          You. Take A Glance At What It’s Like To Be A Part Of A Startup And
          Dive Into The World Of Business With Our Annual, Wildly Popular
          GraVITas Event.
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
          <Grid item xs={3}>
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
            <Box className="registerButton">Register Now</Box>
          </Grid>
        </Grid>
      </Grid>
      <Box class="illusContainer">
        <img src={illus1} alt={"illustration"}></img>
      </Box>
    </Box>
  );
}