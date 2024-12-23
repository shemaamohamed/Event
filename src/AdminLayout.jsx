import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./common/AuthContext";
import NotificationDropdown from "./components/Notification";
import styled from "styled-components";

const demoTheme = createTheme({
  palette: {
    mode: "light",
    
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '0.2em',
        },
        '*::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0, 8, 251, 0)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#c82333',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const AuthButton = styled.div`
  background-color: #c82333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #c82333;

  &:hover {
    background-color: #d90429;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

function ToolbarActionsSearch() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ButtonWrapper>
      <NotificationDropdown />
      <AuthButton onClick={handleLogout}>Logout</AuthButton>
    </ButtonWrapper>
  );
}

const AdminLayoutBasic = () => {
  const { isAdmin, registrationType } = useAuth();
  const isSpeaker = registrationType === "speaker";
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = {
    speaker: [
      { title: "Visa", icon: "🛂", segment: "visa" },
      { title: "Flight", icon: "✈️", segment: "flight/form" },
      { title: "Airport Transfer", icon: "🚐", segment: "airport/transfer" },
      { title: "Reservation", icon: "🏨", segment: "reservation/form" },
      { title: "All Trips", icon: "🗺️", segment: "view-user-trips" },
      { title: "Gala Dinner", icon: "🍽️", segment: "gala/dinner" },
      { title: "Profile", icon: "👤", segment: "speaker/profile" },
    ],
    admin: [
      { title: "Conferences", icon: "🎓", segment: "conferences/page" },
      { title: "Exhibitions", icon: "🏢", segment: "exhibitions" },
      { title: "Trips", icon: "🧳", segment: "create/trip" },
      { title: "Flight Admin", icon: "✈️", segment: "flights" },
      { title: "Gala Dinner", icon: "🍷", segment: "gala" },
      { title: "Create Job", icon: "🛠️", segment: "job" },
      { title: "Messages", icon: "💬", segment: "msgs" },
      { title: "Job Applicants", icon: "📋", segment: "applicants/job/admin" },
      { title: "Trips Users Discount", icon: "💸", segment: "user" },
      { title: "Users", icon: "👥", segment: "pending/users" },
      { title: "Reservation Room Prices", icon: "🏠", segment: "room/prices" },
      { title: "Enter new flights", icon: "🛩️", segment: "enter/new/flights" },
      { title: "Group Registration Table", icon: "📊", segment: "admin/excel/table" },
      { title: "Add Clients", icon: "➕", segment: "add/client" },
      { title: "Sponsorship Packages", icon: "📦", segment: "sponsor/admin/add/table" },
      { title: "Sponsorship Option", icon: "⚙️", segment: "sponsor/option/form" },
      { title: "Booth Cost", icon: "🏬", segment: "sponsor/admin/booth/cost" },
      { title: "Upload Floor Plan", icon: "📐", segment: "admin/upload/floor" },
      { title: "Visa Files", icon: "📝", segment: "visa/files" },
      { title: "Reservations Files", icon: "🗂️", segment: "reservations/files" },
      { title: "Flights Files", icon: "🛫", segment: "flight/files" },
    ],
  };

  function getNavigationItems(isAdmin, isSpeaker) {
    let items = [];
    if (isSpeaker && !isAdmin) {
      items = [...menuItems.speaker];
    }
    if (isAdmin) {
      items = [...menuItems.admin];
    }
    return items;
  }

  const NAVIGATION = getNavigationItems(isAdmin, isSpeaker);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{ navigate }}
      theme={demoTheme}
      disableColorScheme={true}
      branding={{
        title: "",
        homeUrl: "/",
        logo: <img src="/image/logo.png" alt="Logo" height={40} />,
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsSearch,
        }}
        sx={{
          '& .MuiDrawer-root, & .MuiDrawer-paper': {
            backgroundColor: '#2c3e50',
            color: 'white',
            '& .MuiListItemButton-root': {
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#c82333',
              },
             '&.Mui-selected': {
    backgroundColor: '#d90455', 
  },
            },
          },
        
          '& .MuiDrawer-paper': {
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'red',
              borderRadius: '2px',
            },
          },
        }}
        
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default AdminLayoutBasic;
