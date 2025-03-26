import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import ApplicationCards from "./ApplicationCards";

const views = {
  home: "This is the Home View.",
  info: "This is the Info View.",
  settings: "This is the Settings View.",
};

const HistoryStatus: React.FC = () => {
  const [activeView, setActiveView] = useState("home");
  const applications =
    useSelector((state: RootState) => state.applications) || [];

  return (
    <Grid container spacing={2} padding={2}>
      {applications.assets.map((item, index) => (
        <ApplicationCards item={item} />
      ))}
    </Grid>
  );
};

export default HistoryStatus;
