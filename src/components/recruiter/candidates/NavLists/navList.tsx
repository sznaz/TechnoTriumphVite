import { Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import React from "react";
// import styles from "./NavList.module.css";
const navItems = [
  { label: "Industry", options: ["IT", "Finance", "Healthcare", "Education"] },
  { label: "Location", options: ["Bangalore", "Mumbai", "Delhi", "Pune"] },
  { label: "Skills", options: ["React", "Node.js", "JavaScript", "Python"] },
  {
    label: "Experience",
    options: ["0-2 Years", "2-5 Years", "5-10 Years", "10+ Years"],
  },
];
const NavLists = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {navItems.map((item) => (
        <Box key={item.label}>
          <Button
            sx={{
              color: "black",
              backgroundColor: "#FFFFFF",
              "&:hover": { backgroundColor: "#FFFFFF" },
              borderRadius: 10,
              border: "1px solid #FFBB65",
              minWidth: "123px",
              padding: "10px 24px",
              textTransform: "none",
              fontWeight: "550",
              height: "40px",
              fontSize: "14px"
            }}
            onClick={(event) => handleClick(event, item.label)}
          >
            {item.label}
            <KeyboardArrowDownOutlinedIcon sx={{ marginLeft: 1 , color: "#7A7A7A "}} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedItem === item.label}
            onClose={handleClose}
          >
            {item.options.map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}
      <Button
        sx={{
          color: "#fff",
          backgroundColor: "#FB8C00",
          "&:hover": { backgroundColor: "#FB8C00" },
          borderRadius: 10,
          minWidth: "123px",
          fontWeight: "550",
          textTransform: "none",
          height: "40px",
          fontSize: "14px"
        }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default NavLists;
