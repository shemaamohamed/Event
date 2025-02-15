import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./common/AuthContext";
import NotificationDropdown from "./components/Notification";
import styled from "styled-components";
import { useDemoRouter } from "@toolpad/core/internal";
import { useState, useEffect } from "react";  // إضافة useState و useEffect

import axios from "axios";
import { HomeIcon } from "lucide-react";
import { Button } from "@mui/material";

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
  background-color: #9B1321;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #9B1321;

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
  const handleHome = () => {
    navigate("/home");
  }

  return (
    <ButtonWrapper>
      <NotificationDropdown />
      <Button
      sx={{
        backgroundColor: "#9B1321",
        borderRadius: "50%",
        color: "#fff",
        color: "#fff",
    width: "40px", // Adjust size
    height: "40px",
    minWidth: "unset", 
      }}
    onClick={handleHome}
  >
    <HomeIcon fontSize="medium" />
  </Button>
      <AuthButton onClick={handleLogout}>Logout</AuthButton>
    </ButtonWrapper>
  );
}

const AdminLayoutBasic = () => {
  const { isAdmin, registrationType } = useAuth();
  const isSpeaker = registrationType === "speaker";
  const isSponsor = registrationType === "sponsor";
  const isAttendance = registrationType === "attendance";
  const [link, setLink] = useState(null);
  const [cert, setCert] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const router = useDemoRouter('/admin');


  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const getUserData = () => {
    const token = localStorage.getItem("token"); // ضع التوكن هنا

    // إرسال طلب GET إلى API
    axios
      .get(`${BaseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
        },
      })
      .then((response) => {
        // عند النجاح، طباعة الداتا المستلمة من السيرفر
        console.log(response?.data?.user?.certificatePDF);
        setCert(response?.data?.user?.certificatePDF);
      })
      .catch((error) => {
        // إذا حدث خطأ، طباعة الخطأ
        console.error("Error:", error);
      });
  };
  // دالة لجلب بيانات المتحدث
  const getSpeakerInfo = async () => {
    try {
      // جلب التوكن من localStorage
      const token = localStorage.getItem("token");

      // التأكد من وجود التوكن
      if (!token) {
        throw new Error("توكن المستخدم غير موجود.");
      }

      try {
        // إرسال طلب GET مع التوكن في الهيدر
        const response = await axios.get(`${BaseUrl}/speakers/info`, {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
          },
        });

        // التعامل مع البيانات المستلمة من الـ API
        const speaker = response?.data?.speaker;
        console.log(speaker);

        // تحديث الحالة بالرابط
        if (speaker) {
          setLink(speaker?.link);
          console.log(link);
        }
      } catch (err) {
        // التعامل مع الأخطاء في حال فشل الطلب
        console.error("خطأ في إرسال الطلب:", err);
        throw err; // إعادة الخطأ ليتم معالجته في مكان آخر إذا لزم الأمر
      }
    } catch (err) {
      // التعامل مع الأخطاء في حال عدم وجود التوكن
      console.error("خطأ في جلب التوكن أو البيانات:", err);
    }
  };

  useEffect(() => {
    getSpeakerInfo();
    getUserData();
  }, []);




  const menuItems = {
    speaker: [
      { title: "Visa", icon: "🛂", segment: "visa" },
      { title: "Flight", icon: "✈️", segment: "flight/form" },
      { title: "Airport Transfer", icon: "🚐", segment: "airport/transfer" },
      { title: "Reservation", icon: "🏨", segment: "reservation/form" },
      { title: "All Trips", icon: "🗺️", segment: "view-user-trips" },
      { title: "My Trips", icon: "🗺️", segment: "user/trip/participants" },
      { title: "Group Trips", icon: "🗺️", segment: "user/group/trip/participants" },
      { title: "Gala Dinner", icon: "🍽️", segment: "gala/dinner" },
      { title: "Profile", icon: "👤", segment: "speaker/profile" },
      
      ...(cert ? [{ title: "Certification", icon: "🎓", segment: "certification" }] : []),
    
      ...(link ? [{ title: "Zoom Link", icon: "🔗", segment: "speaker/link" }] : [])
    ],
    
    admin: [
      { title: "Conferences", icon: "🎓", segment: "conferences/page" },
      { title: "Exhibitions", icon: "🏢", segment: "exhibitions" },
      { title: "Gala Dinner", icon: "🍷", segment: "gala" },
      { title: "Dinner Detail", icon: "🍷", segment: "dinner/admin" },
      { title: "Create Workshop", icon: "🍷", segment: "admin/workshop" },
      { title: "Create Gallery", icon: "🖼️", segment: "add/gallery" },

      { title: "Messages", icon: "💬", segment: "msgs" },
      { title: "Users", icon: "👥", segment: "pending/users" },
      { title: "All Speakers", icon: "🎤", segment: "all-speakers" },
      { title: "All Attendances", icon: "📅", segment: "all-attendances" },
      { title: "All Sponsors", icon: "🤝", segment: "all-sponsors" },
      { title: "Notifications", icon: "🤝", segment: "notification" },
      { title: "Closing Date", icon: "🤝", segment: "close/date" },

      { title: "Group Registration Table", icon: "📊", segment: "admin/excel/table" },
      { title: "Add Clients", icon: "➕", segment: "add/client" },
      { title: "Airport Transfer Bookings", icon: "✈️", segment: "all-airports" },
      { title: "Visas", icon: "👨‍👩‍👧‍👦", segment: "view-visas" },
      { title: "Reservations", icon: "🏨", segment: ["reservations"], children: [
        { title: "Reservations", segment: "" },
        { title: "Reservation Room Prices", segment: "room/prices" },
      ] },
      { title: 'Flights', icon: "🛩️", segment: ["flights"], children: [
        { title: "Flight Admin", segment: "" },
        { title: "Flight Files", segment: "files" },
        { title: "Enter new flights", segment: "enter/new" },
      ] },
      { title: 'Job', icon: "🛠️", segment: ["job"], children: [
        { title: "Create Job", segment: "" },
        { title: "Job Applicants", segment: "applicants" },
      ] },
      { title: 'Sponsor', icon: "📦", segment: ["sponsor"], children: [
        { title: "Sponsorship Packages", segment: "add/table" },
        { title: "Sponsorship Option", segment: "option/form" },
        { title: "Booth Cost", segment: "booth/cost" },
        { title: "Upload Floor Plan", segment: "upload/floor" },
        { title: "Booth Size Table", segment: "size/edit" },
        { title: "Sponsorships Table", segment: "sponsorships/edit" },
        { title: "Sponsorships Option Table", segment: "SponsorShipOption/edit" },
        // ayat
        { title: "Floor Plan Edit", segment: "floor/edit" },


      ] },
      { title: 'Files', icon: "📁", segment: ["files"], children: [
        { title: "Visa Files", segment: "visa" },
        { title: "Reservations Files", segment: "reservations" },
        { title: "Certificate Files", segment: "certificate" },
      ] },
      { title: 'Trip', icon: "🧳", segment: ["trip"], children: [
        { title: "All Trips", segment: "" },
        { title: "Trips Users Discount", segment: "user" },
        { title: "Private Trip Participants", segment: "participants/user" },
        { title: "Group Trip Participants", segment: "participants/group" },
      ] }
    ],
    attendance:[
      { title: "Visa", icon: "🛂", segment: "visa" },
      { title: "Flight", icon: "✈️", segment: "flight/form" },
      { title: "Airport Transfer", icon: "🚐", segment: "airport/transfer" },
      { title: "Reservation", icon: "🏨", segment: "reservation/form" },
      { title: "All Trips", icon: "🗺️", segment: "view-user-trips" },
      { title: "My Trips", icon: "🗺️", segment: "user/trip/participants" },
      ...(cert ? [{ title: "Certification", icon: "🎓", segment: "certification" }] : []),

    ]
  };

  function getNavigationItems(isAdmin, isSpeaker) {
    let items = [];
    if (isSpeaker && !isAdmin ) {
      items = [...menuItems.speaker];
    }
    if (isAdmin ) {
      items = [...menuItems.admin];
    }if(isAttendance && !isAdmin ){
      items=[...menuItems.attendance]

    }
    return items;
  }

  const NAVIGATION = getNavigationItems(isAdmin, isSpeaker);

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
        homeUrl: "/home",
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

export default AdminLayoutBasic;
