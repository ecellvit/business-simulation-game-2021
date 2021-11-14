import React from "react";
import Box from "@mui/material/Box";

/*Components*/
import { Nav } from "../../components/nav";
import {
  Section1,
  Section2,
  Timeline,
  Section3,
} from "../../components/landingComponents";

export function Landing() {
  return (
    <Box>
      <Nav />
      <Section1 />
      <Section2 />
      <Timeline />
      <Section3 />
    </Box>
  );
}