import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import "./landingComponents.css";
import HorizontalTimeline from "../../resources/images/TimelineSection.svg";
import VerticalTimeline from "../../resources/images/TimelineSectionPhone.svg";

export function Timeline() {
  const [TimelineImage, settimelineImage] = useState(VerticalTimeline);

  useEffect(() => {
    window.addEventListener("load", () => {
      if (window.innerWidth < 1000) {
        settimelineImage(VerticalTimeline);
      } else {
        settimelineImage(HorizontalTimeline);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1000) {
        settimelineImage(VerticalTimeline);
      } else {
        settimelineImage(HorizontalTimeline);
      }
    });
    return () => {
      window.addEventListener("load", () => {
        if (window.innerWidth < 1000) {
          settimelineImage(VerticalTimeline);
        } else {
          settimelineImage(HorizontalTimeline);
        }
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth < 1000) {
          settimelineImage(VerticalTimeline);
        } else {
          settimelineImage(HorizontalTimeline);
        }
      });
    };
  }, []);

  return (
    <Box className="timelineContainer">
      <Box class="sectionHead">Timeline</Box>
      <Box class="timelineImageContainer">
        <img src={TimelineImage} alt={"Timeline"} />
      </Box>
    </Box>
  );
}
