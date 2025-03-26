import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const CustomList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default CustomList;
