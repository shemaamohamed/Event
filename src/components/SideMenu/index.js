import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, List, IconButton, Toolbar, Box, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAuth } from "../../common/AuthContext";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

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
  const [link, setLink] = useState(null);
  const [cert, setCert] = useState(null);
  const { isAdmin, registrationType, isLoggedIn } = useAuth();
  const isSpeaker = registrationType === "speaker";


  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

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
  const isAttendance = registrationType === "attendance";
  const isSponsor = registrationType === "sponsor";

  const attendanceMenuItems =
    isAttendance && !isAdmin
      ? [
          { label: "Visa33", icon: "🛂", path: "/visa" },
          { label: "Flight", icon: "✈️", path: "/flight/form" },
          { label: "Airport Transfer", icon: "🚐", path: "/airport/transfer" },
          { label: "Reservation", icon: "🏨", path: "/reservation/form" },
          { label: "All Trips", icon: "🗺️", path: "/view-user-trips" },
          { label: "My Trips", icon: "🗺️", path: "/user/trip/participants" },
          // { label: "Certificate", icon: "🗺️", path: "/mycertificate" },
        ]
      : [];

  const speakerMenuItems =
    isSpeaker && !isAdmin
      ? [
          { label: "Visa", icon: "🛂", path: "/visa" },
          { label: "Flight", icon: "✈️", path: "/flight/form" },
          { label: "Airport Transfer", icon: "🚐", path: "/airport/transfer" },
          { label: "Reservation", icon: "🏨", path: "/reservation/form" },
          { label: "All Trips", icon: "🗺️", path: "/view-user-trips" },
          { label: "My Trips", icon: "🗺️", path: "/user/trip/participants" },
          { label: "Gala Dinner", icon: "🍽️", path: "/gala/dinner" },
          { label: "Profile", icon: "👤", path: "/speaker/profile" },
          // { label: "Certificate", icon: "🗺️", path: "/mycertificate" },
          ...(cert
            ? [{ label: "Certification", icon: "👤", path: "/certification" }]
            : []),

          ...(link
            ? [{ label: "Zoom Link", icon: "👤", path: "/speaker/link" }]
            : []),
        ]
      : [];

  const adminMenuItems = isAdmin
    ? [
        { label: "Conferences", icon: "🎓", path: "/conferences/page" },
        { label: "Exhibitions", icon: "🏢", path: "/exhibitions" },
        { label: "Trips", icon: "🧳", path: "/create/trip" },
        { label: "Gala Dinner", icon: "🍷", path: "/gala" },
        { label: "Dinner Detail", icon: "🍷", path: "/dinner/admin" },
        { label: "Create Workshop", icon: "🍷", path: "/workshop/admin" },

        { label: "Create Job", icon: "🛠️", path: "/job" },
        { label: "Messages", icon: "💬", path: "/msgs" },
        { label: "Job Applicants", icon: "📋", path: "/applicants/job/admin" },
        { label: "Trips Users Discount", icon: "💸", path: "/user" },
        { label: "Users", icon: "👥", path: "/pending/users" },
        { label: "Reservation Room Prices", icon: "🏠", path: "/room/prices" },
        { label: "Enter new flights", icon: "🛩️", path: "/enter/new/flights" },
        { label: "Add Clients", icon: "➕", path: "/add/client" },
        {
          label: "Sponsorship Packages",
          icon: "📦",
          path: "/sponsor/admin/add/table",
        },
        {
          label: "Sponsorship Option",
          icon: "⚙️",
          path: "/sponsor/option/form",
        },
        { label: "Booth Cost", icon: "🏬", path: "/sponsor/admin/booth/cost" },
        { label: "Upload Floor Plan", icon: "📐", path: "/admin/upload/floor" },
        { label: "Visa Files", icon: "📝", path: "/visa/files" },
        {
          label: "Reservations Files",
          icon: "🗂️",
          path: "/reservations/files",
        },
        { label: "Flights Files", icon: "🛫", path: "/all/flight/files" },
        { label: "Certificate Files", icon: "🎓", path: "/certificate/files" },
        { label: "All Speakers", icon: "🗣️", path: "/all-speakers" },
        { label: "All Attendances", icon: "📅", path: "/all-attendances" },
        { label: "All Sponsors", icon: "🤝", path: "/all-sponsors" },
        {
          label: "All Groups Registration",
          icon: "📊",
          path: "/admin/excel/table",
        },
        { label: "Reservations", icon: "📋", path: "/reservations/room" },
        {
          label: "Airport Transfer Bookings",
          icon: "✈️",
          path: "/all-airports",
        },
        { label: "Flights", icon: "✈️", path: "/flights" },
        {
          label: "Private Trip Participants",
          icon: "🧑‍🤝‍🧑",
          path: "/trip/participants",
        },
        {
          label: "Group Trip Participants",
          icon: "👨‍👩‍👧‍👦",
          path: "group/trip/participants",
        },
        {
          label: "Visas",
          icon: "👨‍👩‍👧‍👦",
          path: "/view-visas",
        },
      ]
    : [];

  const menuItems = [
    ...speakerMenuItems,
    ...adminMenuItems,
    ...attendanceMenuItems,
  ];

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

          <Drawer
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 270,
                backgroundColor: "#2c3e50",
                color: "white",
              },
            }}
          >
            <Box
              sx={{ width: 270 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <StyledBox>
                {menuItems.map((item, index) => (
                  <StyledButton
                    key={index}
                    disablePadding
                    component={NavLink}
                    to={item.path}
                  >
                    {item.label} {item.icon}
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
