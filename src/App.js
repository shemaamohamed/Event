import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import AboutUs from "./pages/aboutUs";
import RegisterType from "./pages/RegisterType";
import FlightForm from "./components/FlightForm";
import FlightFormAdmin from "./components/FlightFormAdmin";
import ConferencesAdmin from "./components/ConferencesAdmin";
import Exhibitions from "./pages/Exhibitions";
import SelectConferences from "./pages/SelectConferences";
import Reservation from "./components/Reservation";
import ViewTrip from "./components/TripComponents/viewTrips";
import UsersList from "./components/UserList";
import Loader from "./CoreComponent/Loader";
import ViewUserTrips from "./components/TripComponents/TripsUser/ViewTrips";
import ViewOneTripUser from "./components/TripComponents/TripsUser/ViewOneTripUser";
import AirportTransfer from "./components/last_pages/AirportTransfer";
import AirportTransferPrice from "./components/last_pages/AirportTransfer/AirpotPrice";
import GalaDinner from "./components/last_pages/GalaDinner";
import AddScientificPaper from "./components/SceintificPaper";
import VisaPage from "./components/last_pages/Visa";
import AboutUsEvent from "./components/UI/AboutUs";
import OurClients from "./components/UI/OurClients";
import OurTeams from "./components/UI/OurTeam";
import ManagementConsulting from "./components/UI/ManagementConsulting";
import Planning from "./components/UI/EventPlanning";
import SocialEvents from "./components/UI/SocialEvents";
import MediaCampaign from "./components/UI/MediaCampaign";
import LogisticSecretarial from "./components/UI/LogisticSecretarial";
import TourSlider from "./components/UI/TourAndTourism";
import Expositions from "./components/UI/Expositions";
import Workshops from "./components/UI/Workshop";
import Seminars from "./components/UI/Seminars";
import CorporateMeetings from "./components/UI/CorporateMeetings";
import ConceptCreation from "./components/UI/ConceptCreation";
import Conference from "./components/UI/Conference/ConferenceData";
import ContactUs from "./components/UI/ContactUs";
import TopNavbar from "./components/UI/NavigationBar";
import Audiovisuals from "./components/UI/Audiovisuals";
import Conference3 from "./components/UI/conferece2";
import EditSpeakerData from "./components/Admin/EditSpeakerData";
import Packages from "./components/UI/Packages";
import Welcome from "./components/UI/Welcome";
import AdventureSection from "./components/UI/individuals";
import TicketBooking from "./components/UI/TicketBooking";
import HotelBooking from "./components/UI/HotelBooking";
import Transportation from "./components/UI/Transportation";
import SpeakerProfileForm from "./components/SpeakerProfileEditForm";
import RegisterSponsorPage from "./components/Registeration/Sponsor";
import RegisterAttendancePage from "./components/Registeration/attendance";
import AdminVisa from "./components/AdminVisa";
import FAQ from "./components/UI/FAQ";
import ExcelUpload from "./components/Registeration/Group-Registeration/AddExelFile";
import AdminGroupComponent from "./components/Registeration/Group-Registeration/AdminUpdate";
import RegisterGroupPage from "./components/Registeration/Group-Registeration";
import MainFlightFormUpdate from "./components/FlightForm/updateMainFlightForm";
import GetCompanion from "./components/FlightForm/GetCompanion";
import ParentComponent from "./components/ReservationstepperPage";
import TripsStepperPage from "./components/TripsStepperPage/index";
import FlightStepperPage from "./components/FlightStepperPage";
import FlightStepperPageAdmin from "./components/FlightStepperPageAdmin";
import DinnerDetails from "./components/GalaDinner";
import SponsorSection from "./components/Sponsor/SponsorshipOption";
import UpdateVisaStatus from "./components/UpdateVisaStatus";
import StepperAcceptFlight from "./components/FlightStepperAcceptFlight";
import NotificationMessage from "./components/GroupNotificationMessage";
import SpeakerTable from "./components/GalaDinner/AdminDinnerView";
import BookingsTable2 from "./components/BookingsTable";
import UpcomingConferences from "./components/UpcomingConferences";
import CreateJob from "./components/Jobs/CreateJob";
import JobList from "./components/Jobs/GetJobs";
import JobApplicants from "./components/Jobs/AdminApplicantList";
import ApplicantsList from "./components/Jobs/AdminApplicantList/applicants/applicants";
import Messages from "./components/Msg";
import EditAttendanceData from "./components/Admin/EditAttendanceData";
import PendingUsersTable from "./components/Admin/PendingUsers";
import EnterNewFlights from "./components/Admin/EnterNewFlights";
import EditAbstractData from "./components/abstract";
import EventCard from "./components/CardEvent";
import PastEvent from "./components/Event/Past";
import UpcomingConferences2 from "./components/Event/upcoming";
import PaperSubmissionForm from "./components/abstract/abstractUser";
import OnePage from "./components/OnePageComponent";
import Home from "./pages/HomeR";
import SponsorshipForm from "./components/Sponsor/AdminOption";
import SponsorshipTable2 from "./components/Sponsor/SponsorshipTable/PostTable";
import BoothCostForm from "./components/BoothCostForm";
import SponsorInvoice from "./components/SpoonsotInvoice";
import NavBar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import SideMenu from "./components/SideMenu";
import TripForm from "./components/Tourism";
import Transportation3 from "./components/Transportation";
import TravelForm from "./components/BookingTicket";
import TravelForm2 from "./components/BookingTicket";
import TravelFormHotel from "./components/Hotelbooking";
import RoomPriceForm from "./components/RoomPrice";
import InvoicesS from "./components/AdminInvoiceSponsor";
import TableComponentExcel from "./components/AdminTableExcelGroup";
import Speakers4 from "./components/SpeakerProduct";
import ViewFormExhibitions from "./pages/Exhibitions/ViewForm";
import ConferenceDetails from "./pages/newConferences";
import AllConferencesPage from "./components/ConferencesPage";
import ExhibitionsPage from "./components/ExhibitionsPage";
import ImageGallery from "./components/GalaDinner/Gallery";
import OneExhibit from "./components/OneExhibit";
// import Speakers4 from "./components/SpeakerConf";
import "./style.scss";
import FloorPlanUploader from "./components/FloorPlann";
import GroupTripRegistration from "./components/GroupTripRegistration";
import SpeakerUpdateForm from "./components/test";
import RegisterOther from "./pages/registerOther";
import AdminForm from "./components/Admin/AdminForm";
import AddClient from "./components/AddClient";
import { useAuth } from "./common/AuthContext";
import Footer from "./components/UI/Footer";

const App = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const { isAdmin, registrationType, isLoggedIn } = useAuth();
  const isSponsor = registrationType === "sponsor";
  // Listen for showLoader and hideLoader events
  useEffect(() => {
    const handleShowLoader = () => setShowLoader(true);
    const handleHideLoader = () => setShowLoader(false);

    // Attach event listeners
    window.addEventListener("showLoader", handleShowLoader);
    window.addEventListener("hideLoader", handleHideLoader);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("showLoader", handleShowLoader);
      window.removeEventListener("hideLoader", handleHideLoader);
    };
  }, []);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // التمرير يتم فوراً بدون تأثير السلاسة
    });
  }, [pathname]);


  const noNavRoute = [
    "/registertype",
    "/register/speaker",
    "/registerPage",
    "/login",
  ];
  return (
    <Fragment>
      <ToastContainer />
      <Loader show={showLoader} />

      <div className="layout-page-container">
        {!noNavRoute.includes(location.pathname) &&
          !location.pathname.includes("/registerPage") &&
          !location.pathname.includes("/conference/details") &&
          !location.pathname.includes("/other") &&
          !isSponsor &&
          !location.pathname.includes("/register/") && (
            <div className="layout-sidemenu">
              <SideMenu />
            </div>
          )}

        <div
          style={{
            width:'100%'
          }}
          // style={{
          //   width:
          //     !noNavRoute.includes(location.pathname) &&
          //     !location.pathname.includes("/registerPage") &&
          //     !location.pathname.includes("/conference/details") &&
          //     !location.pathname.includes("/other") &&
          //     isLoggedIn &&
          //     !isSponsor &&
          //     !location.pathname.includes("/register/")
          //       ? "calc(100%)"
          //       : "100%",
          // }}
        >
          {/* {!noNavRoute.includes(location.pathname) &&
            !location.pathname.includes("/registerPage") &&
            !location.pathname.includes("/other") &&
            !location.pathname.includes("/register/") && (
              <div className="layout-navbar">
                <NavBar />
              </div>
            )} */}
            <NavBar />

          <div className="layout-content">
            <Routes className="main">
              <Route path="/exhibitions" element={<Exhibitions />} />
              <Route path="/adminForm/:userId" element={<AdminForm />} />
              <Route path="/other" element={<RegisterOther />} />
              <Route path="/test" element={<SpeakerUpdateForm />} />
              <Route
                path="/conference/details/:conferenceId"
                element={<ConferenceDetails />}
              />
              <Route path="/trip/user/:tripId" element={<TripsStepperPage />} />
              <Route
                path="/edit/speaker/data/:conferenceId/:userId"
                element={<EditSpeakerData />}
              />{" "}
              <Route
                path="/edit/attendance/data/:conferenceId/:userId"
                element={<EditAttendanceData />}
              />
              <Route path="/reservation/form" element={<Reservation />} />
              <Route path="/conferences" element={<AllConferencesPage />} />
              <Route path="/page/exhibitions" element={<ExhibitionsPage />} />
              <Route path="/flights" element={<FlightFormAdmin />} />
              <Route path="/flight/form" element={<FlightForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register/speaker/:id" element={<RegisterPage />} />
              <Route
                path="/registerPage/:type"
                element={<SelectConferences />}
              />
              <Route path="/conferences/page" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/registertype" element={<RegisterType />} />
              <Route
                path="register/attendance/:conferenceId"
                element={<RegisterAttendancePage />}
              />
              <Route
                path="/register/group/:conferenceId"
                element={<RegisterGroupPage />}
              />
              <Route path="/stepper" element={<ParentComponent />} />
              <Route
                path="register/sponsor/:conferenceId"
                element={<RegisterSponsorPage />}
              />
              <Route path="/create/trip" element={<ViewTrip />} />
              <Route path="/user" element={<UsersList />} />
              <Route path="/view-user-trips" element={<ViewUserTrips />} />
              {/* //this route for view one trip for user not admin  */}
              <Route path="/view/trip/:id" element={<ViewOneTripUser />} />
              <Route path="/airport/transfer" element={<AirportTransfer />} />
              <Route path="/gala" element={<GalaDinner />} />
              <Route path="/gala/dinner" element={<DinnerDetails />} />
              <Route path="/paper" element={<AddScientificPaper />} />
              <Route path="/visa" element={<VisaPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/about_us" element={<AboutUsEvent />} />
              <Route path="/our_clients" element={<OurClients />} />
              <Route path="/our_team" element={<OurTeams />} />
              <Route
                path="/management_consulting"
                element={<ManagementConsulting />}
              />
              <Route path="/planning" element={<Planning />} />
              <Route path="/social_events" element={<SocialEvents />} />
              <Route path="/media_campaign" element={<MediaCampaign />} />
              <Route
                path="/logistic_secretarial"
                element={<LogisticSecretarial />}
              />
              <Route path="/tour_slider" element={<TourSlider />} />
              <Route path="/expositions" element={<Expositions />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/seminars" element={<Seminars />} />
              <Route
                path="/corporate_meetings"
                element={<CorporateMeetings />}
              />
              <Route path="/concept_creation" element={<ConceptCreation />} />
              <Route path="/ser" element={<Conference />} />
              <Route path="/contact_us" element={<ContactUs />} />
              <Route path="/top_navbar" element={<TopNavbar />} />
              <Route path="/audiovisuals" element={<Audiovisuals />} />
              <Route path="/conf" element={<Conference3 />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/adventureSection" element={<AdventureSection />} />
              <Route path="/ticket/booking" element={<TicketBooking />} />
              <Route path="/hotel/booking" element={<HotelBooking />} />
              <Route path="/transportation" element={<Transportation />} />
              <Route path="/speaker/profile" element={<SpeakerProfileForm />} />
              <Route path="/admin/visa" element={<AdminVisa />} />
              <Route path="/add/excel" element={<ExcelUpload />} />
              <Route
                path="/group/update/admin/:register_id"
                element={<AdminGroupComponent />}
              />
              <Route path="/flights/users" element={<FlightStepperPage />} />
              <Route path="/flights/users/:mode" element={<FlightStepperPage />} />
              <Route
                path="/flights/admins/:flight_id"
                element={<FlightStepperPageAdmin />}
              />
              <Route
                path="/user/flight/update/:id"
                element={<MainFlightFormUpdate />}
              />
              {/* <Route path="/companion" element={<GetCompanion />} /> */}
              <Route
                path="/admin/visa2/:registerId"
                element={<UpdateVisaStatus />}
              />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sponsor/section" element={<SponsorSection />} />
              <Route
                path={`/accept/flight/:user_id`}
                element={<StepperAcceptFlight />}
              />
              <Route path="/group/msg" element={<NotificationMessage />} />
              {/* admin table view */}
              <Route
                path="/table/dinner/speaker/:conferenceId"
                element={<SpeakerTable />}
              />
              <Route
                path="/table/booking/airport/:conferenceId"
                element={<BookingsTable2 />}
              />
              <Route
                path="/upcoming/conferences"
                element={<UpcomingConferences />}
              />
              <Route path="/job/list" element={<JobList />} />
              <Route path="/job" element={<CreateJob />} />
              <Route path="/applicants/job/admin" element={<JobApplicants />} />
              <Route path="/pending/users" element={<PendingUsersTable />} />
              <Route path="/enter/new/flights" element={<EnterNewFlights />} />
              {/* <Route path="/Attendance/profile" element={<AttendanceProfileForm />} /> */}
              <Route
                path="/job/admin/Applicants/:jobId"
                element={<ApplicantsList />}
              />
              <Route path="/msgs" element={<Messages />} />
              <Route
                path="/abs/:userId/:conferenceId"
                element={<EditAbstractData />}
              />
              <Route path="/past/event" element={<PastEvent />} />
              <Route path="/up/event" element={<UpcomingConferences2 />} />
              <Route
                path="/paper/form/:conferenceId"
                element={<PaperSubmissionForm />}
              />
              <Route
                path="/conference/details/:conferenceId"
                element={<OnePage />}
              />
              <Route
                path="/conference/speaker/:conferenceId"
                element={<Speakers4 />}
              />
              {/* /abs/${notification?.register_id}/${notification?.conference_id} */}
              <Route
                path="/sponsor/option/form"
                element={<SponsorshipForm />}
              />
              <Route
                path="/sponsor/admin/add/table"
                element={<SponsorshipTable2 />}
              />
              <Route
                path="/sponsor/admin/booth/cost"
                element={<BoothCostForm />}
              />
              <Route path="/sponsor/invoice" element={<SponsorInvoice />} />
              <Route path="/trip/form" element={<TripForm />} />
              <Route path="/trans/form" element={<Transportation3 />} />
              <Route path="/ticket/booking2" element={<TravelForm2 />} />
              <Route path="/travel/hotel" element={<TravelFormHotel />} />
              <Route path="/room/prices" element={<RoomPriceForm />} />
              <Route path="/admin/invoice/sponsor" element={<InvoicesS />} />
              <Route
                path="/admin/upload/floor"
                element={<FloorPlanUploader />}
              />
              <Route
                path="/admin/excel/table"
                element={<TableComponentExcel />}
              />
              <Route
                path="/exhibitions/view"
                element={<ViewFormExhibitions />}
              />
              <Route path="/gallery" element={<ImageGallery />} />
              <Route path="/one/exhibits/:exhibitId" element={<OneExhibit />} />
              <Route path="/add/client" element={<AddClient />} />
              <Route
                path="/group-trip/user/:tripId"
                element={<GroupTripRegistration />}
              />
            </Routes>
            {!noNavRoute.includes(location.pathname) &&
            !location.pathname.includes("/registerPage") &&
            !location.pathname.includes("/other") &&
            !location.pathname.includes("/register/") && (
                <Footer />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
