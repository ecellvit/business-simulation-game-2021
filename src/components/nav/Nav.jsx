import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./nav.css";

import fpLogo from "../../resources/images/futurepreneursLogo.svg";
import ecellLogo from "../../resources/images/ecellLogoBlack.png";

export function Nav() {
  return (
    <Box className="navMainContainer">
      <Box className="navSection1">
        <Grid
          container
          className="logosSection"
          direction="row"
          justifyContent="space-between"
        >
          <Grid
            item
            xs={1}
            className="logosSection-item1"
            justifyContent="flex-start"
          >
            <img src={fpLogo} alt={"FuturePreneurs Logo"} />
          </Grid>
          <Grid
            item
            xs
            zeroMinWidth
            className="logosSection-item2"
            justifyContent="center"
          >
            FUTUREPRENEURS 7.0
          </Grid>
          <Grid
            item
            xs={1.5}
            className="logosSection-item3"
            justifyContent="flex-end"
          >
            <img src={ecellLogo} alt={"E-Cell Logo"} />
          </Grid>
        </Grid>
      </Box>
      <Box className="navSection2">
        <Box className="navbarContainer" margin={0}>
          <Grid
            container
            className="navbarContainer-head"
            sx={{
              display: { xs: "none", lg: "block", sm: "block" },
            }}
          >
            <Grid item xs zeroMinWidth>
              Business Simulation Game
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            // xs={4}
            className="navbarContainer-menu"
            wrap={"nowrap"}
            sx={{
              justifyContent: {
                xs: "center",
                sm: "flex-end",
              },
            }}
          >
            <Grid item>About</Grid>
            <Grid item>Timeline</Grid>
            <Grid item>Sponsors</Grid>
            <Grid item>Register</Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
