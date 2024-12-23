import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from "./file.png";
// ** utils & components
import { backendUrlImages } from "../../constant/config";
import httpService from "../../common/httpService";
import PaperSubmissionForm from "../../components/abstract/abstractUser";
import Speakers4 from "../../components/SpeakerProduct";
import Home from "../HomeR";
import Welcome from "../../components/UI/Welcome";
import { useNavigate } from "react-router-dom";
// ** styles
import "./style.scss";
import TemporaryDrawer from "./Drawer";
import OurClients from "../../components/UI/OurClients";

const ConferenceDetails = () => {
  const navigate =useNavigate()
  const { conferenceId } = useParams();
  const [selectedSection, setSelectedSection] = useState("overview");
  const [data, setData] = useState({});
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const getConferenceData = async () => {
    const getAuthToken = () => localStorage.getItem("token");

    const response = await httpService({
      method: "GET",
      url: `${BaseUrl}/con/id/${conferenceId}`,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    setData(response);
  };

  useEffect(() => {
    getConferenceData();
  }, []);

  const sections = {
    overview: "Conference Overview",
    home: "Home",
    Welcome: "Welcome",
    Abstract: "Abstract",
    Speakers: "Speakers",
    topics: "Scientific Topics",
    pricing: "Registration",
    committee: "Committee Members",
    firstAnnouncement: "First Announcement Document",
    secondAnnouncement: "Second Announcement Document",
    brochure: "Conference Brochure",
    scientificProgram: "Scientific Program Document",
    sponsor:"Sponsor"
  };
const token = localStorage.getItem("token")
  const renderContent = () => {
    const { conference, scientific_topics, prices, committee_members } = data;

    const renderDocumentContent = (url, label) => (
      <div className="document-section">
        {url ? (
          <>
            <div className="document-preview">
              <img src={image} alt="Document Icon" width={"100px"} />
            </div>
            <div className="document-info">
              <h3>{label}</h3>
              <p className="desc">
                This document contains important details about {label}. Please
                download it for more information.
              </p>
              <a href={url} download className="btn-download">
                Download {label}
              </a>
            </div>
          </>
        ) : (
          <div className="no-document">
            <div className="document-preview">
              <img src="/path/to/no-document-icon.png" alt="Document Icon" />
            </div>
            <div className="document-info">
              <h3>{label}</h3>
              <p>No document is currently available for this section.</p>
            </div>
          </div>
        )}
      </div>
    );

    switch (selectedSection) {
      case "home":
        return (
          <div className="content">
            <Home />
          </div>
        );
        case "sponsor":
          return (
            <div className="content">
              <OurClients />
            </div>
          );
      case "Welcome":
        return (
          <div className="content">
            <Welcome />
          </div>
        );
      case "overview":
        return (
          <div className="image-with-content">
            <div className="content">
              {data?.image_url ? (
                <img
                  className="img-conference"
                  src={`${backendUrlImages}${(data?.image_url).replace(
                    "https://panel.mayazin.co/storage",
                    ""
                  )}`}
                  alt="Conference"
                />
              ) : (
                <p>No image available.</p>
              )}
            </div>
            <div className="content">
              <h2>{conference?.title}</h2>
              <p>{conference?.description}</p>
              <div className="info-grid">
                <div>
                  <strong>Location:</strong> {conference?.location}
                </div>
              </div>
            </div>
          </div>
        );
      case "Abstract":
        return (
          <div className="content">
            <PaperSubmissionForm conferenceId={conferenceId} />
          </div>
        );
      case "Speakers":
        return (
          <div className="content">
            <Speakers4 conferenceId={conferenceId} />
          </div>
        );
      case "topics":
        return (
          <div className="content">
            {scientific_topics?.map((topic) => (
              <div key={topic.id} className="card">
                <h3>{topic?.title}</h3>
             {   topic?.description &&   <p>{topic?.description }</p>}
              </div>
            ))}
          </div>
        );
      case "pricing":
        return (
          <div className="content">
            {prices?.map((price) => (
              <div key={price.id} className="card">
                <h3>{price?.price_type}</h3>
                <p>
                  <strong>Price:</strong> {price?.price}
                </p>
                <p>{price?.description}</p>
              </div>
            ))}
           {!token &&  <button className="btn-download" onClick={()=>{
              navigate("/registertype")
            }}>Register?</button>}
          </div>
        );
      case "committee":
        return (
          <div className="content">
            {committee_members?.map((member) => (
              <div key={member.id} className="card">
                <img
                  src={`${backendUrlImages}${member?.committee_image}`}
                  alt={member?.name}
                />
                <h3>{member?.name}</h3>
              </div>
            ))}
          </div>
        );
      case "visa":
        return (
          <div className="content">
            <p>
              <strong>Visa Price:</strong> {conference?.visa_price}
            </p>
          </div>
        );
      case "firstAnnouncement":
        return renderDocumentContent(
          `${backendUrlImages}${(data?.first_announcement_pdf_url).replace(
            "https://panel.mayazin.co/storage",
            ""
          )}`,
          "First Announcement"
        );
      case "secondAnnouncement":
        return renderDocumentContent(
          `${backendUrlImages}${(data?.second_announcement_pdf_url).replace(
            "https://panel.mayazin.co/storage",
            ""
          )}`,
          "Second Announcement"
        );
      case "brochure":
        return renderDocumentContent(
          `${backendUrlImages}${(data?.conference_brochure_pdf_url).replace(
            "https://panel.mayazin.co/storage",
            ""
          )}`,
          "Brochure"
        );
      case "scientificProgram":
        return renderDocumentContent(
          `${backendUrlImages}${(data?.conference_scientific_program_pdf_url).replace(
            "https://panel.mayazin.co/storage",
            ""
          )}`,
          "Scientific Program"
        );
      default:
        return (
          <div className="content">
            <p>Section not found.</p>
          </div>
        );
    }
  };

  return (
    <div className="conference-detailss">
      <TemporaryDrawer
        sections={Object.entries(sections)}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default ConferenceDetails;
