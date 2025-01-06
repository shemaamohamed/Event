import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./common/AuthContext";
import NotificationDropdown from "./components/Notification";
import styled from "styled-components";
import { useDemoRouter } from "@toolpad/core/internal";

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

function ToolbarActions() {
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
  const isSponsor =registrationType==="sponsor";
  const navigate = useNavigate();
  const location = useLocation();
  const router = useDemoRouter('/admin');


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
  
      { title: "Gala Dinner", icon: "🍷", segment: "gala" },
      { title: "Messages", icon: "💬", segment: "msgs" },
   
      { title: "Users", icon: "👥", segment: "pending/users" },
      { title: "Reservation Room Prices", icon: "🏠", segment: "room/prices" },
      { title: "Group Registration Table", icon: "📊", segment: "admin/excel/table" },
      { title: "Add Clients", icon: "➕", segment: "add/client" },
      
      {
        title:'Flights',
        icon: "🛩️",
        segment: [ "flights"],
        children: [
          { title: "Flight Admin", segment: "" },
          { title: "Flight Files", segment: "files" },
          {title: "Enter new flights", segment: "enter/new" },
        ],

      },
      {
        title:'Job',
        icon: "🛠️",
        segment: [ "job"],
        children: [
          { title: "Create Job", segment: "" },
          { title: "Job Applicants", segment: "applicants" },
        ],
      },
      {
        title:'Sponsor',
        icon: "📦",
        segment: [ "sponsor"],
        children: [
          { title: "Sponsorship Packages", segment: "add/table" },
          { title: "Sponsorship Option", segment: "option/form" },
          { title: "Booth Cost", segment: "booth/cost" },
          { title: "Upload Floor Plan", segment: "upload/floor" },
        ],
      },{
        title:'Files',
        icon: "📁",
        segment: [ "files"],
        children: [
          { title: "Visa Files", segment: "visa" },
          { title: "Reservations Files", segment: "reservations" },
        ],
      },{
        title:'Trip',
        icon: "🧳",
        segment: [ "trip"],
        children: [
          { title: "All Trips", segment: "" },
          { title: " Trips Users Discount", segment: "user" },
        ],
      }


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
      router={{ router, navigate, pathname: location.pathname, searchParams: new URLSearchParams(location.search) }}
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
          toolbarActions: ToolbarActions,
        }}
        sx={{
          '& .MuiDrawer-root, & .MuiDrawer-paper': {
            backgroundColor: '#2c3e50',
            color: 'white',
            '& .MuiListItemButton-root': {
              borderRadius: '10px',
              marginBottom: '10px',
              '&:hover': {
                backgroundColor: '#c82333',
              },
             '&.Mui-selected': {
    backgroundColor: '#c82333', 
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
