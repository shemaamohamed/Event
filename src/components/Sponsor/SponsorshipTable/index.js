import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../common/AuthContext";
import "./style.scss";
const SponsorshipTable = ({ onSelectedSponsorshipsChange , selectedIds }) => {
  const { myConferenceId } = useAuth();
  const [data, setData] = useState([]);
  const [selectedSponsorshipIds, setSelectedSponsorshipIds] = useState([]);

  useEffect(() => {
console.log({selectedIds});
console.log({selectedSponsorshipIds});

    setSelectedSponsorshipIds(selectedIds);
  }, [selectedIds]);

  const handleCheckboxChange = (id) => {
    // تأكد من أن selectedSponsorshipIds هو مصفوفة
    const validSelectedSponsorshipIds = Array.isArray(selectedSponsorshipIds)
      ? selectedSponsorshipIds
      : [];
  
    const updatedIds = validSelectedSponsorshipIds.includes(id)
      ? validSelectedSponsorshipIds.filter((prevId) => prevId !== id)
      : [...validSelectedSponsorshipIds, id];
  
    setSelectedSponsorshipIds(updatedIds);
    onSelectedSponsorshipsChange(updatedIds);
  };
  
  const getData = () => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    if (!myConferenceId) return;
    axios
      .get(`${BaseUrl}/sponsorship-options/table/get/${myConferenceId}`) // Replace with your API endpoint
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    if (myConferenceId) {
      getData();
    }
  }, [myConferenceId]);
  if (!myConferenceId) {
    return <div>Loading conference data...</div>;
  }
  return (
    <div className="con-sponsorship"
    style={{
      marginTop: "20px",
    }}
    >
      {data.length > 0 && (
        <div className="header-sponsorship-packages">Sponsorship Packages</div>
      )}
      {data.length > 0 && (
        <div className="tab-con"
        style={{
          overflowX:'auto'
        }}
        >
        <table className="sponsorship-table">
          <thead>
            <tr>
              <th className="table-header">Details</th>
              {data.map((row, index) => (
                <th key={index}>{row.item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Package Price</td>
              {data?.map((row, index) => (
                <td key={index}>
                  {row.price}
                  <br />
                  <input
                    type="checkbox"
                    style={{
                      width:'20px',
                      height:'20px'
                    }}
                    checked={selectedSponsorshipIds?.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Maximum Sponsors per category</td>
              {data.map((row, index) => (
                <td key={index}>{row.max_sponsors}</td>
              ))}
            </tr>
            <tr>
              <td>Booth Size</td>
              {data.map((row, index) => (
                <td key={index}>{row.booth_size}</td>
              ))}
            </tr>
            <tr>
              <td>Conference Booklet ad</td>
              {data.map((row, index) => (
                <td key={index}>{row.booklet_ad}</td>
              ))}
            </tr>
            <tr>
              <td>Website Advertisement</td>
              {data.map((row, index) => (
                <td key={index}>{row.website_ad}</td>
              ))}
            </tr>
            <tr>
              <td>Bags Inserts</td>
              {data.map((row, index) => (
                <td key={index}>{row.bags_inserts}</td>
              ))}
            </tr>
            <tr>
              <td>Logo on Backdrop (Main Hall)</td>
              {data.map((row, index) => (
                <td key={index}>{row.backdrop_logo}</td>
              ))}
            </tr>
            <tr>
              <td>Free Non-Residential Registration</td>
              {data.map((row, index) => (
                <td key={index}>{row.non_residential_reg}</td>
              ))}
            </tr>
            <tr>
              <td>Free Residential Registration</td>
              {data.map((row, index) => (
                <td key={index}>{row.residential_reg}</td>
              ))}
            </tr>
          </tbody>
        </table>  </div>
      )}
    </div>
  );
};

export default SponsorshipTable;
