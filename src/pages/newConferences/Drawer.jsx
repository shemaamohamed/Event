import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

const StyledBox = styled(Box)`
  background-color: #2c3e50;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 57px);
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: var(--scrollbar-track-color);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-color);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover-color);
  }
`;

const StyledButton = styled(Box)`
  background-color: #34495e;
  color: #ecf0f1;
  padding: 15px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #c62828;
  }

  &.active {
    background-color: #c62828;
    color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

export default function TemporaryDrawer({
  sections,
  selectedSection,
  setSelectedSection,
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <StyledBox className="side-drawer">
        {sections.map(([key, title]) => (
          <StyledButton
            key={key}
            disablePadding
            className={`drawer-item ${selectedSection === key ? "active" : ""}`}
            onClick={() => setSelectedSection(key)}
          >
            {title}
          </StyledButton>
        ))}
      </StyledBox>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon
          sx={{
            color: " gray",
            fontSize: 40,
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#2c3e50",
            color: "white",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
