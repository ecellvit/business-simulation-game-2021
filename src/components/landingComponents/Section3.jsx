import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./landingComponents.css";
import problemSolvingIcon from "../../resources/images/problemSolvingIcon.svg";
import skillTestingIcon from "../../resources/images/skillTestingIcon.svg";
import selfAnalysisIcon from "../../resources/images/selfAnalysisIcon.svg";

const itemsData = [
  {
    icon: problemSolvingIcon,
    head: "Problem Solving",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    icon: skillTestingIcon,
    head: "Skill Testing",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    icon: selfAnalysisIcon,
    head: "Self Analysis",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];

function Item({ icon, head, content }) {
  return (
    <Grid container direction="column" className="section3-items">
      <Grid item className="section3-Item1">
        <img src={icon} alt={head} />
      </Grid>

      <Grid item className="section3-Item2">
        {head}
      </Grid>

      <Grid item className="section3-Item3">
        {content}
      </Grid>
    </Grid>
  );
}

export function Section3() {
  return (
    <Box className="section3-MainContainer">
      <Box
        display="flex"
        justifyContent="space-between"
        className={"section3-ItemsContainer"}
        sx={{
          flexFlow: {
            xs: "column",
            sm: "row wrap",
            md: "row wrap",
          },
        }}
      >
        {itemsData.map((data) => (
          <Item icon={data.icon} head={data.head} content={data.content} />
        ))}
      </Box>
    </Box>
  );
}
