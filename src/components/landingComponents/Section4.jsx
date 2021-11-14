import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./landingComponents.css";
import illus4 from "../../resources/images/illus4.jpg";

export function Section4() {
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
      <Box class="illusContainer">
        <img src={illus4} alt={"illustration"}></img>
      </Box>

      <Grid
        container
        direction="column"
        spacing={2}
        sx={{
          width: {
            xs: "100%",
            sm: "60%",
            md: "60%",
          },
        }}
      >
        <Grid item className="section2-head">
          Story Behind...
        </Grid>
        <Grid item className="section1-text" alignSelf="center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <br />
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <br />

        </Grid>
      </Grid>
    </Box>
  );
}
