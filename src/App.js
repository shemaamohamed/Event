import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'react-toastify/dist/ReactToastify.css'
import 'react-modal-video/css/modal-video.css'
import 'photoswipe/dist/photoswipe.css'

import '../src/assets/css/color-switcher-design.css'
import '../src/assets/css/flaticon.css'
import '../src/assets/css/elegent-icon.css'
import '../src/assets/css/fontawesome-all.css'
import '../src/assets/css/animate.css'
import '../src/assets/css/style.css'
import '../src/assets/css/responsive.css'

import Preloader from './components/others/Preloader';
import ScrollUpBtn from './components/others/ScrollUpBtn';
import React, { Fragment, useEffect, useState } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
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
import toast, { Toaster } from "react-hot-toast";

import TourSlider from "./components/UI/TourAndTourism";

import Conferencee from "./components/UI/Conference/ConferenceData";
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
import "bootstrap/dist/css/bootstrap.min.css";

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
// import GroupTripRegistration from "./components/GroupTripRegistration";
import SpeakerUpdateForm from "./components/test";
import RegisterOther from "./pages/registerOther";
import AdminForm from "./components/Admin/AdminForm";
import AddClient from "./components/AddClient";
import VisaFiles from "./components/VisaFiles";
import ReservationsFiles from "./components/ReservationsFiles";
import CertificateComponent from "./components/CertificateComponent";
import FlightsFiles from "./components/FlightsFiles";
import SpeakersComponent from "./components/SpeakersComponent";
import AddZoomLink from "./components/AddZoomLink";
import { useAuth } from "./common/AuthContext";
import SpeakerList from "./components/SpeakerList";
import DataTable from "./components/ReservationAdminData";
import ReservationsComponent from "./components/ReservationAdminData";
import TripParticipantsComponent from "./components/TripParticipantsComponent";
import TripParticipantsComponentGroup from "./components/TripParticipantsComponentGroup";
import AttendanceComponent from "./components/AttendanceComponent";
import SponsorsComponent from "./components/SponsorsComponent";
import AirportTransferBookingsComponent from "./components/AirportTransferBookingsComponent";
import TripParticipantsForUser from "./components/TripParticipantsForUser";
import Certification from "./components/Certification";
import VisasComponent from "./components/VisaComponent";
import Certificate from "./components/certificate";
import InvoiceTrip from "./components/InvoiceTrip";
import UserLayout from './UserLayout';
import AdminLayoutBasic from './AdminLayout';
import OverViewDashboard from './components/OverViewDashboard/index';
import GroupTripRegistration from './components/GroupTripRegistration/index';
import ClientsSlide from "./components/ClientsSlide";
import ForgetPassword from "./pages/login/forgetpassword";
import ForgetPassword2 from "./pages/login/forgotpassword2";
import ErrorPage from './pages/innerPages/ErrorPage';
import Size from "./components/SponsorAdmin/BoothSize";
import Sponsorships from "./components/SponsorAdmin/Sponsorships";
import SponsorShipOption from "./components/SponsorAdmin/SponsorShipOption";
import EditFloor from "./components/SponsorAdmin/EditFloorPlan";
import ForgotPassword2 from "./pages/login/forgotpassword2";
import SuccessVerification from "./pages/login/SuccessVerification";
import FailedVerification from "./pages/login/failedverification";

import Teams from './pages/innerPages/Speakers';
import Home1 from './pages/homePages/Home1';
import ClientV1 from './components/client/ClientV1';
import AboutUs from './pages/innerPages/AboutUs';
import Pricing from './pages/innerPages/Pricing';
import Contact from './pages/innerPages/Contact';
import Faq from './pages/innerPages/Faq';
import Gallery from './pages/innerPages/Gallery';
import Expositions from './pages/innerPages/Expositions';
import Conference from './pages/innerPages/Conference';
import Workshops from './pages/innerPages/Workshops';
import Seminars from './pages/innerPages/Seminars';
import CorporateMeetings from './pages/innerPages/CorporateMeetings';
import MediaCampaign from './pages/innerPages/MediaCampaign';
import LogisticSecretarial from './pages/innerPages/LogisticSecretarial';
import SocialEvents from './pages/innerPages/SocialEvents';
import ManagementConsulting from './pages/innerPages/ManagementConsulting';
import ConceptCreation from './pages/innerPages/ConceptCreation';
import Planning from './pages/innerPages/Planning';
import ComprehensiveConferenceManagement from './pages/innerPages/ComprehensiveConferenceManagement';
import ConferenceExhibitionSolutions from './pages/innerPages/ConferenceExhibitionSolutions';
import MarketingVideoProduction from './pages/innerPages/MarketingVideoProduction';
import ComprehensiveMarketingServices from './pages/innerPages/ComprehensiveMarketingServices';
import AdditionalConferenceExhibitionServices from './pages/innerPages/AdditionalConferenceExhibitionServices';
import FooterV1 from './components/footer/FooterV1';
import CreateWorkshop from './components/CreateWorkshop/index';
import DinnerAdmin from './components/DinnerAdmin/index';
import GroupTripParticipantsForUser from './components/TripParticipantsForUserGroup/index';
import ConferenceWelcomeMessageForm from './components/welcomComponents/ConferenceWelcomeMessageForm/index';
import EditWelcomeMessage from './components/editWelcomeMsg';
import SpoParentComponent from './components/SpoParentComponent';
import AgreementSigning from './components/Sponsor/Agreement Signing';
import WorkShopEdit from './components/EditWorkShop';
import Notifications from './components/Notifications';
import ClosingDateForm from './components/ClosingDateForm';
import PreConferences from './components/Previous';
import SpeakerInfo from './components/speaker/SpeakerInfo';
import AdminGallery from './pages/AdminGallery';
import TravelConsultant from './pages/innerPages/TravelConsultant';
import Album from './pages/AlbumContent';
import SuccessP from './components/SuccessP';
import FailedP from './components/FailedP';




const App = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const { isAdmin, registrationType, isLoggedIn } = useAuth();
  const isSponsor = registrationType === "sponsor";
  const limit =localStorage.getItem("tokenTimestamp");
  const isAttendance = registrationType === "attendance";
  const isGroup = registrationType === "group_registration";
  const isOther =registrationType===null;
  const isSpeaker = registrationType === "speaker";

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
      <Toaster
        position="top-right" // الموضع الافتراضي
        toastOptions={{
          duration: 5000, // المدة الافتراضية (5 ثواني)
          // style: {
          //   background: '#333',
          //   color: '#fff',
          // },
        }}/>
      <Loader show={showLoader} />

      <div className="layout-page-container">
       

        <div
          style={{
            width: "100%",
          }}
         
        >
         

          <div >
           { 
              
                ((!isLoggedIn && !limit) || 
                (( isSponsor|| isGroup ||isOther ) && isLoggedIn && limit && !isAdmin) )&&(
                  <Routes >
                  <Route path='/' element={<UserLayout/>}>
                  {/* //home */}
                <Route path='/pricing' element={<Pricing />}></Route>
                <Route path="/pre/con" element={<PreConferences />} />
                <Route path="/Mamoun" element={<SpeakerInfo />} />

                <Route path="/failed" element={<FailedP/>}/>
                <Route path='/gallery' element={<Gallery />}></Route>
                <Route path='/album/:id' element={<Album/>}></Route>

                <Route path='/our_team' element={<Teams />}></Route>
                <Route path='/our_clients' element={<ClientV1/>}></Route>
                <Route path="/job/list" element={<JobList />} />
                <Route path="/page/exhibitions" element={<ExhibitionsPage />} />
                <Route path='/about-us' element={<AboutUs />}></Route>
                                <Route path='/contact_us' element={<Contact />}></Route>
{
  isSponsor &&(
    <Route path='/sponsor/stepper' element={<SpoParentComponent />}></Route>


  )
}  
{
                isGroup&&(
                  <Route path="add/excel" element={<ExcelUpload />} />


                )
              }  
                {
                      isLoggedIn&&(
                        <Route path='/faq' element={<Faq />}></Route>


                      )
                    }
              {
                !isLoggedIn&&(
                  <>
                                    <Route path="/login" element={<LoginPage />} />

                  <Route path="/forgetpassword" element={<ForgetPassword />} />



<Route path="/other" element={<RegisterOther />} />
<Route path="/registertype" element={<RegisterType />} />
            {/* register */}
            <Route
  path="register/attendance/:conferenceId/:type/:priceId"
  element={<RegisterAttendancePage />}

/>

<Route
                path="/register/group/:conferenceId"
                element={<RegisterGroupPage />}
              />
              <Route path="/register/speaker/:id" element={<RegisterPage />} />
              <Route
                path="/registerPage/:type"
                element={<SelectConferences />}
              />
              <Route path="/reset-password/:token" element={<ForgotPassword2 />} />

               <Route
                path="register/sponsor/:conferenceId"
                element={<RegisterSponsorPage />}
              />
              
              <Route path="/successverification" element={<SuccessVerification/>}/>
              <Route path="/failedverification" element={<FailedVerification/>}/>
              <Route path="/success" element={<SuccessP/>}/>
              <Route path="/failed" element={<FailedP/>}/>
                  </>
                  


                )
              }                   


                                <Route path='/sign/agreement' element={<AgreementSigning />}></Route>

                  {/* services */}
                <Route path='/conf' element={<Conference />}></Route>
                <Route path="/expositions" element={<Expositions />} />
                <Route path="/workshops" element={<Workshops />} />
              <Route path="/seminars" element={<Seminars />} />
              <Route path="/corporate_meetings" element={<CorporateMeetings />}/>
              
              <Route path="/planning" element={<Planning />} />
              <Route path="/social_events" element={<SocialEvents />} />
              <Route path="/media_campaign" element={<MediaCampaign />} />
              <Route path="/logistic_secretarial" element={<LogisticSecretarial />}/>
              <Route path="/concept_creation" element={<ConceptCreation />} />
              <Route path="/management_consulting"element={<ManagementConsulting />}/>
              <Route path="/travel_consultant" element={<TravelConsultant />} />

              {/* Additional Services */}
              <Route path="/comprehensive-conference-management" element={<ComprehensiveConferenceManagement />} />
              <Route path="/conference-exhibition-solutions" element={<ConferenceExhibitionSolutions />} />
              <Route path="/marketing-video-production" element={<MarketingVideoProduction />} />
              <Route path="/comprehensive-marketing-services" element={<ComprehensiveMarketingServices />} />
              <Route path="/additional-conference-exhibition-services" element={<AdditionalConferenceExhibitionServices />} />
              <Route path="/sponsor/invoice" element={<SponsorInvoice />} />




                <Route path='*' element={<ErrorPage />}></Route>

                  <Route path="/home" element={<Home1 />} />
                  
              <Route
                path="/paper/form/:conferenceId"
                element={<PaperSubmissionForm />}
              />

              {/* before login */}
              {/* <Route path="/home" element={<Home />} /> */}
             
              <Route path="/tour_slider" element={<TourSlider />} />
             
              <Route path="/ser" element={<Conference />} />
              <Route path="/top_navbar" element={<TopNavbar />} />
              <Route path="/audiovisuals" element={<Audiovisuals />} />
              <Route path="/conf" element={<Conference3 />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/welcome" element={<Welcome />} />
            

              <Route path="/conferences" element={<AllConferencesPage />} />
              <Route
                                        path="conference/details/:conferenceId"
                                        element={<ConferenceDetails />}
                                      />
              <Route
                path="/conference/details/:conferenceId"
                element={<OnePage />}
              />

              <Route path="/up/event" element={<UpcomingConferences2 />} />
              <Route path="one/exhibits/:exhibitId" element={<OneExhibit />} />
              <Route path="/notification" element={<Notifications/>} />


              
              
                                      {/* <Route path="/all-speakers" element={<SpeakersComponent />} />
              <Route
                path="/all-attendances"
                element={<AttendanceComponent />}

              /> */}  
                                    
                {/* //group */}

                {/* //sponsor */}
                    <Route path="/sponsor/section" element={<SponsorSection />} />
                    


              
              <Route
                                          path="/conference/speaker/:conferenceId"
                                          element={<Speakers4 />}
                                        />








              </Route>
              </Routes>


                )
              }
              
                                
              {
                                  isLoggedIn && limit&& ( isAdmin ||isAttendance ||isSpeaker ) &&(
                                    <Routes>


                                    <Route path="/" element={<AdminLayoutBasic/>} >
                                   


                                    

  
                                    <Route
                path="/paper/form/:conferenceId"
                element={<PaperSubmissionForm />}
              />
  
  
  <Route path="/admin/workshop" element={<CreateWorkshop/>} />
  <Route path="/edit/workshop/:conferenceId" element={<WorkShopEdit/>} />

  <Route path="exhibitions" element={<Exhibitions />} />
                                      <Route path="/dinner/admin" element={<DinnerAdmin />} />
                                      <Route path="/close/date" element={<ClosingDateForm />} />
                                      <Route path="/add/gallery" element={<AdminGallery />} />

                                     
                                     
                                      <Route path="adminForm/:userId" element={<AdminForm />} />
                                      <Route path="test" element={<SpeakerUpdateForm />} />
                                      <Route
                                        path="conference/details/:conferenceId"
                                        element={<ConferenceDetails />}
                                      />
                                                                  <Route path="/certification" element={<Certification />} />

                                      <Route
                                        path="edit/speaker/data/:conferenceId/:userId"
                                        element={<EditSpeakerData />}
                                      />{" "}
                                      <Route
                                        path="edit/attendance/data/:conferenceId/:userId"
                                        element={<EditAttendanceData />}
                                      />
                                      <Route path="/reservation/form" element={<Reservation />} />
                                        {/* files Admin */}
                                      <Route path="/files/visa" element={<VisaFiles />} />
  
                                      <Route path="/files/reservations" element={<ReservationsFiles />} />
                                      <Route path="/files/certificate" element={<CertificateComponent />} />
                                      {/* //flights */}
                                      <Route path="/flights" element={<FlightFormAdmin />} />
                                      <Route path="/flight/form" element={<FlightForm />} />
                                      <Route path="/flights/files" element={<FlightsFiles />} />
                                      <Route path="/flights/enter/new" element={<EnterNewFlights />} />
                                      {/* //trip */}
                                      <Route path="/trip" element={<ViewTrip />} />
                                      <Route path="/trip/user" element={<UsersList />} />
                                      <Route path="/trip/user/:tripId" element={<TripsStepperPage />} />
                                      <Route
                                          path="/trip/participants/user"
                                          element={<TripParticipantsComponent />}
                                        />{" "}
                                        <Route
                path="/user/trip/participants"
                element={<TripParticipantsForUser />}
              />
                                          <Route
                path="/user/group/trip/participants"
                element={<GroupTripParticipantsForUser />}

                
              />

<Route
                path="/conference/welcome/message/form/:id"
                element={<ConferenceWelcomeMessageForm />}

                
              />
                                        {/* <Route
                                          path="/trip/participants/user"
                                          element={<TripParticipantsForUser />}
                                        /> */}

                                        <Route
                                          path="/trip/participants/group"
                                          element={<TripParticipantsComponentGroup />}
                                        />


                                      
                                      <Route path="conferences/page" element={<HomePage />} />
                                      <Route path="about" element={<AboutUs />} />
                                      
                                      <Route path="stepper/:mode" element={<ParentComponent />} />
                                      <Route path="stepper" element={<ParentComponent />} />
                                    
                                     

                                      <Route path="view-user-trips" element={<ViewUserTrips />} />
                                      {/* //this route for view one trip for user not admin  */}
                                      <Route path="view/trip/:id" element={<ViewOneTripUser />} />
                                      <Route path="airport/transfer" element={<AirportTransfer />} />
                                      <Route path="gala" element={<GalaDinner />} />
                                      <Route path="gala/dinner" element={<DinnerDetails />} />
                                      <Route path="paper" element={<AddScientificPaper />} />
                                      <Route path="visa" element={<VisaPage />} />
                                      
                                      <Route path="adventureSection" element={<AdventureSection />} />
                                      <Route path="ticket/booking" element={<TicketBooking />} />
                                      <Route path="hotel/booking" element={<HotelBooking />} />
                                      <Route path="transportation" element={<Transportation />} />
                                      {
                                        isSpeaker &&(
                                          <Route path="speaker/profile" element={<SpeakerProfileForm />} />
                                        )
                                      }
                                      
                                      <Route path="admin/visa" element={<AdminVisa />} />
                                      <Route
                                        path="group/update/admin/:register_id"
                                        element={<AdminGroupComponent />}
                                      />
                                      <Route path="flights/users" element={<FlightStepperPage />} />
                                      <Route
                                        path="flights/users/:mode"
                                        element={<FlightStepperPage />}
                                      />
                                      <Route
                                        path="flights/admins/:flight_id"
                                        element={<FlightStepperPageAdmin />}
                                      />
                                      <Route
                                        path="user/flight/update/:id"
                                        element={<MainFlightFormUpdate />}
                                      />
                                      {/* <Route path="/companion" element={<GetCompanion />} /> */}
                                      <Route
                                        path="admin/visa2/:registerId"
                                        element={<UpdateVisaStatus />}
                                      />
                                      <Route
                                        path={`accept/flight/:user_id`}
                                        element={<StepperAcceptFlight />}
                                      />
                                      <Route path="group/msg" element={<NotificationMessage />} />
                                      {/* admin table view */}
                                      <Route
                                        path="table/dinner/speaker/:conferenceId"
                                        element={<SpeakerTable />}
                                      />
                                      <Route
                                        path="table/booking/airport/:conferenceId"
                                        element={<BookingsTable2 />}
                                      />
                                      <Route
                                        path="upcoming/conferences"
                                        element={<UpcomingConferences />}
                                      />
                                      <Route path="job" element={<CreateJob />} />
                                      <Route path="job/applicants" element={<JobApplicants />} />

                                      <Route path="/pending/users" element={<PendingUsersTable />} />
                                      <Route path="/all-speakers" element={<SpeakersComponent />} />
                                     

                                      <Route
                                        path="/all-attendances"
                                        element={<AttendanceComponent />}

                                      />
                                      <Route path="/all-sponsors" element={<SponsorsComponent />} />


                                      {/* <Route path="/Attendance/profile" element={<AttendanceProfileForm />} /> */}
                                      <Route
                                        path="job/Applicants/:jobId"
                                        element={<ApplicantsList />}
                                      />
                                      <Route path="msgs" element={<Messages />} />
                                      <Route
                                        path="abs/:userId/:conferenceId"
                                        element={<EditAbstractData />}
                                      />
                                      <Route path="past/event" element={<PastEvent />} />
                                      <Route
                                        path="paper/form/:conferenceId"
                                        element={<PaperSubmissionForm />}
                                      />
                                      {/* <Route
                                        path="conference/details/:conferenceId"
                                        element={<OnePage />}
                                      /> */}
                                      <Route
                                          path="/conference/speaker/:conferenceId"
                                          element={<Speakers4 />}
                                        />
                                                      <Route path="/speaker/link" element={<SpeakerList />} />

                                      <Route
                                        path="conference/speaker/:conferenceId"
                                        element={<Speakers4 />}
                                      />
                                      {/* /abs/${notification?.register_id}/${notification?.conference_id} */}
                                      <Route
                                        path="sponsor/option/form"
                                        element={<SponsorshipForm />}
                                      />
                                      <Route
                                        path="sponsor/add/table"
                                        element={<SponsorshipTable2 />}
                                      />
                                      <Route
                                        path="sponsor/booth/cost"
                                        element={<BoothCostForm />}
                                      />
                                      <Route
                                        path="sponsor/upload/floor"
                                        element={<FloorPlanUploader />}
                                      />
                                      <Route path="trip/form" element={<TripForm />} />
                                      <Route path="trans/form" element={<Transportation3 />} />
                                      <Route path="ticket/booking2" element={<TravelForm2 />} />
                                      <Route path="travel/hotel" element={<TravelFormHotel />} />
                                      <Route path="admin/invoice/sponsor" element={<InvoicesS />} />
                                      
                                      <Route
                                        path="admin/excel/table"
                                        element={<TableComponentExcel />}
                                      />
                                      <Route
                                        path="exhibitions/view"
                                        element={<ViewFormExhibitions />}
                                      />
                                      <Route path="one/exhibits/:exhibitId" element={<OneExhibit />} />
                                      <Route path="add/client" element={<AddClient />} />
                                      {/* <Route
                                        path="group-trip/user/:tripId"
                                        element={<GroupTripRegistration />}
                                      /> */}
                                      
                                       <Route
                                                          path="/table/zoom/speaker/:conferenceId"
                                                          element={<AddZoomLink />}
                                                          
                                                        />
                                                          <Route
                                                          path="/edit/welcome/:conferenceId"
                                                          element={<EditWelcomeMessage />}
                                                          
                                                        />          
                                                                 
                                                                 
                                                                 
                                                                      <Route path="/speaker/link" element={<SpeakerList />} />
                                                                      <Route
                path="/table/zoom/speaker/:conferenceId"
                element={<AddZoomLink />}
              />
              {/* reservations */}
              <Route path="/reservations" element={<DataTable />} />
              <Route path="/reservations/room/prices" element={<RoomPriceForm />} />
              <Route
                path="/reservations/room"
                element={<ReservationsComponent />}
              />

              
<Route path="/notification" element={<Notifications/>} />

              
               <Route
                path="/all-airports"
                element={<AirportTransferBookingsComponent />}
              />
            
                   <Route path="/view-visas" element={<VisasComponent />} />
                    <Route path="/certificate" element={<Certificate />} />
                    <Route path="//invoice/trip/:participantId/:name" element={<InvoiceTrip />} />
                    <Route path="sponsor/size/edit" element={<Size />} />
                    <Route path="sponsor/Sponsorships/edit" element={<Sponsorships />} />
                    <Route path="sponsor/SponsorShipOption/edit" element={<SponsorShipOption />} />
                    <Route path="sponsor/floor/edit" element={<EditFloor />} />
                    <Route path="reset/password" element={<ForgotPassword2 />} />






                                        
                                <Route path='/sign/agreement' element={<AgreementSigning />}></Route>
                                </Route>



            <Route path='/' element={<UserLayout/>}>
                                {/* //home */}
                              {/* <Route path='/pricing' element={<Pricing />}></Route> */}
                                              <Route path="/Mamoun" element={<SpeakerInfo />} />

                              
                              <Route path='/gallery' element={<Gallery />}></Route>
                              <Route path='/album/:id' element={<Album/>}></Route>

                              <Route path='/our_team' element={<Teams />}></Route>
                              <Route path='/our_clients' element={<ClientV1/>}></Route>
                              <Route path="/job/list" element={<JobList />} />
                              <Route path="/page/exhibitions" element={<ExhibitionsPage />} />
                              <Route path='/about-us' element={<AboutUs />}></Route>
                              <Route path='/contact_us' element={<Contact />}></Route>
                                {/* services */}
                                <Route path='/conf' element={<Conference />}></Route>
                                <Route path="/expositions" element={<Expositions />} />
                                <Route path="/workshops" element={<Workshops />} />
                                <Route path="/seminars" element={<Seminars />} />
                                <Route path="/corporate_meetings" element={<CorporateMeetings />}/>

                                <Route path="/planning" element={<Planning />} />
                                <Route path="/social_events" element={<SocialEvents />} />
                                <Route path="/media_campaign" element={<MediaCampaign />} />
                                <Route path="/logistic_secretarial" element={<LogisticSecretarial />}/>
                                <Route path="/concept_creation" element={<ConceptCreation />} />
                                <Route path="/management_consulting"element={<ManagementConsulting />}/>
                                {/* Additional Services */}
                                <Route path="/comprehensive-conference-management" element={<ComprehensiveConferenceManagement />} />
                                <Route path="/conference-exhibition-solutions" element={<ConferenceExhibitionSolutions />} />
                                <Route path="/marketing-video-production" element={<MarketingVideoProduction />} />
                                <Route path="/comprehensive-marketing-services" element={<ComprehensiveMarketingServices />} />
                                <Route path="/additional-conference-exhibition-services" element={<AdditionalConferenceExhibitionServices />} />
                                <Route path="/travel_consultant" element={<TravelConsultant />} />

                                <Route path="/sponsor/invoice" element={<SponsorInvoice />} />
                                              <Route
                                                                          path="/conference/speaker/:conferenceId"
                                                                          element={<Speakers4 />}
                                                                        />
                                                                        
                                                <Route path='*' element={<ErrorPage />}></Route>

                                <Route path="/home" element={<Home1 />} />

                                <Route
                                path="/paper/form/:conferenceId"
                                element={<PaperSubmissionForm />}
                                />

                                {/* before login */}
                                {/* <Route path="/home" element={<Home />} /> */}

                                <Route path="/tour_slider" element={<TourSlider />} />

                                <Route path="/ser" element={<Conference />} />
                                <Route path="/top_navbar" element={<TopNavbar />} />
                                <Route path="/audiovisuals" element={<Audiovisuals />} />
                                <Route path="/conf" element={<Conference3 />} />
                                <Route path="/packages" element={<Packages />} />
                                <Route path="/welcome" element={<Welcome />} />


                                <Route path="/conferences" element={<AllConferencesPage />} />
                                <Route
                                                      path="conference/details/:conferenceId"
                                                      element={<ConferenceDetails />}
                                                    />
                                <Route
                                path="/conference/details/:conferenceId"
                                element={<OnePage />}
                                />
                                                        <Route path='/faq' element={<Faq />}></Route>


                                <Route path="/up/event" element={<UpcomingConferences2 />} />

                                <Route path="one/exhibits/:exhibitId" element={<OneExhibit />} />
                                <Route path="/notification" element={<Notifications/>} />
      <Route path="/success" element={<SuccessP/>}/>
              <Route path="/failed" element={<FailedP/>}/>



                                                    {/* <Route path="/all-speakers" element={<SpeakersComponent />} />
                                <Route
                                path="/all-attendances"
                                element={<AttendanceComponent />}

                                /> */}  
                                                  
                                {/* //group */}

                                {/* //sponsor */}
                                  <Route path="/sponsor/section" element={<SponsorSection />} />
                                  



                                <Route
                                                        path="/conference/speaker/:conferenceId"
                                                        element={<Speakers4 />}
                                                      />
                                </Route>




          </Routes>

                                  )
                                }

                    
                     
                      
            {/* {!noNavRoute.includes(location.pathname) &&
              !location.pathname.includes("/registerPage") &&
              !location.pathname.includes("/other") &&
              !location.pathname.includes("/register/")
              &&!isLoggedIn &&!limit
               &&     <FooterV1 />
} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
