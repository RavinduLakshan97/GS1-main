import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

const views = {
  home: "This is the Home View.",
  info: "This is the Info View.",
  settings: "This is the Settings View.",
};

const ApplicationCards: React.FC = ({ item }) => {
  const [activeView, setActiveView] = useState("home");

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Box display="flex" border={1} borderColor="grey.300">
        {/* Left Content Area */}
        <Box flex={1} p={2} bgcolor="grey.100">
          <h2>{views[activeView]} </h2>
        </Box>

        {/* Right Panel with Icons */}
        <Box
          width={64}
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="white"
          boxShadow={1}
          p={1}
        >
          <IconButton onClick={() => setActiveView("home")}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={() => setActiveView("info")}>
            <InfoIcon />
          </IconButton>
          <IconButton onClick={() => setActiveView("settings")}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default ApplicationCards;
