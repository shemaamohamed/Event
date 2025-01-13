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




const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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

const RegisterButton = styled(AuthButton)`
  background-color: transparent;
  color: #c82333;

  &:hover {
    background-color: #c82333;
    color: #fff;
  }
`;

function ToolbarActions() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isLoggedIn } = useAuth();
  



  return (
    <>
     {isLoggedIn ? (
        <ButtonWrapper>
          <NotificationDropdown />
          <AuthButton
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </AuthButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <AuthButton onClick={() => {navigate("/login"); }}>Login</AuthButton>
          <RegisterButton onClick={() => {navigate("/registertype"); }}>Register</RegisterButton>
        </ButtonWrapper>
      )}
    </>
   
  );
}

const ConferenceLayout = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const router = useDemoRouter('/admin');

  const NAVIGATION = [
    { title: "Conference Overview", segment: "visa" },
    { title: "Home", segment: "flight/form" },
    { title: "Welcome",  segment: "airport/transfer" },
    { title: "Abstract",segment: "reservation/form" },
    { title: "Speakers", segment: "visa" },
    { title: "Scientific Topics",  segment: "flight/form" },
    { title: "Registration",  segment: "airport/transfer" },
    { title: "Committee Members",  segment: "reservation/form" },
    { title: "First Announcement Document",  segment: "flight/form" },
    { title: "Second Announcement Document",  segment: "airport/transfer" },
    { title: "Conference Brochure", segment: "reservation/form" },
    { title: "Scientific Program Document", segment: "airport/transfer" },
    { title: "Sponsor",  segment: "reservation/form" },
    
 
   
  ];

  


  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{
        router,
        navigate,
        pathname: location.pathname,
        searchParams: new URLSearchParams(location.search),
      }}
      theme={demoTheme}
      disableColorScheme={true}
      branding={{
        title: "",
        homeUrl: "/",
        logo: <img src="/image/logo.png" alt="Logo" height={40} />,
      }}
    >
      {
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
       
      }
    </AppProvider>
  );
};

export default ConferenceLayout;
