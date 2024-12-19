import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, List,IconButton, Toolbar, Box, Button } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAuth } from "../../common/AuthContext";
import styled from "styled-components";

const StyledBox = styled(Box)`
  background-color: #2c3e50;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: calc(100vh);
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
  text-decoration: none;


  &:hover {
    background-color: #c62828;
  }

  &.active {
    background-color: #c62828;
    color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  }
`;


function SideMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { isAdmin, registrationType, isLoggedIn } = useAuth();
  const isSpeaker = registrationType === "speaker";

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const isAttendance = registrationType === "attendance";
  const isSponsor = registrationType === "sponsor";

  const speakerMenuItems = isSpeaker && !isAdmin
    ? [
        { label: "Visa", icon: "🛂", path: "/visa" },
        { label: "Flight", icon: "✈️", path: "/flight/form" },
        { label: "Airport Transfer", icon: "🚐", path: "/airport/transfer" },
        { label: "Reservation", icon: "🏨", path: "/reservation/form" },
        { label: "All Trips", icon: "🗺️", path: "/view-user-trips" },
        { label: "Gala Dinner", icon: "🍽️", path: "/gala/dinner" },
        { label: "Profile", icon: "👤", path: "/speaker/profile" },
      ]
    : [];

  const adminMenuItems = isAdmin
    ? [
        { label: "Conferences", icon: "🎓", path: "/conferences/page" },
        { label: "Exhibitions", icon: "🏢", path: "/exhibitions" },
        { label: "Trips", icon: "🧳", path: "/create/trip" },
        { label: "Flight Admin", icon: "✈️", path: "/flights" },
        { label: "Gala Dinner", icon: "🍷", path: "/gala" },
        { label: "Create Job", icon: "🛠️", path: "/job" },
        { label: "Messages", icon: "💬", path: "/msgs" },
        { label: "Job Applicants", icon: "📋", path: "/applicants/job/admin" },
        { label: "Trips Users Discount", icon: "💸", path: "/user" },
        { label: "Users", icon: "👥", path: "/pending/users" },
        { label: "Reservation Room Prices", icon: "🏠", path: "/room/prices" },
        { label: "Enter new flights", icon: "🛩️", path: "/enter/new/flights" },
        { label: "Group Registration Table", icon: "📊", path: "/admin/excel/table" },
        { label: "Add Clients", icon: "➕", path: "/add/client" },
        { label: "Sponsorship Packages", icon: "📦", path: "/sponsor/admin/add/table" },
        { label: "Sponsorship Option", icon: "⚙️", path: "/sponsor/option/form" },
        { label: "Booth Cost", icon: "🏬", path: "/sponsor/admin/booth/cost" },
        { label: "Upload Floor Plan", icon: "📐", path: "/admin/upload/floor" },
      ]
    : [];

  const menuItems = [...speakerMenuItems, ...adminMenuItems];

  return (
    <>
      {isLoggedIn && (
        <Box>
           <Button onClick={toggleDrawer(true)}>
        <KeyboardArrowRightIcon
          sx={{
            color: " gray",
            fontSize: 40,
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        />
      </Button>

          <Drawer  open={isDrawerOpen} onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              backgroundColor: "#2c3e50",
              color: "white",
            },
          }}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <StyledBox>
                {menuItems.map((item, index) => (
                  <StyledButton  key={index}
                  disablePadding
                   component={NavLink} to={item.path}

                   >
                    {item.label}{' '} {item.icon}
                    
                   
                  </StyledButton>
                ))}
              </StyledBox>
            </Box>
          </Drawer>
        </Box>
      )}
    </>
  );
}

export default SideMenu;
