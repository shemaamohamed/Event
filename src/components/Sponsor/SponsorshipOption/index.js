import React, { useEffect, useState } from "react";
import SponsorshipTable from "../SponsorshipTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../common/AuthContext";
import "./style.scss";
import SponsorInvoice from "../../SpoonsotInvoice";
import Input from "../../../CoreComponent/Input";

const SponsorshipOption = ({ id, title, description, price, onSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected); // تغيير حالة التحديد
    onSelect(id, !selected); // تمرير الـ id والـ selected state للمكون الأب
  };

  return (
    <div
      className={`sponsorship-option-container0 ${selected ? "selected" : ""}`}
      onClick={handleSelect}
    >
      <div className="option-container-header">
        <h3>{title}</h3>
        <p className="option-price">
          <strong>{price}</strong>
        </p>
      </div>
      <p className="option-container-description">{description}</p>
      <div className="option-container-checkbox">
        <input type="checkbox" checked={selected} readOnly />
      </div>
    </div>
  );
};

const StandardBoothPackage = ({ onExhibitNumberChange }) => {
  const [floorPlanUrl, setFloorPlanUrl] = useState(null);
  const { myConferenceId } = useAuth();
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const fetchFloorPlan = async () => {
    if (!myConferenceId) return;

    try {
      const response = await axios.get(
        `${BaseUrl}/floor/plan/${myConferenceId}`
      );
      setFloorPlanUrl(response?.data.data[0].floor_plan);
    } catch (error) {}
  };
  useEffect(() => {
    if (myConferenceId) {
      fetchFloorPlan();
    }
  }, [{ myConferenceId }]);

  return (
    <div className="booth-package">
      <div className="booth-package-header7">Standard Booth Package</div>
      <div className="booth-package-header8">
        <img src={require("./both.jfif")} alt="Booth" />
        <div>
          <p>(Minimum space 9 sqm)</p>
          <ul className="lst-sponser">
            <li>Fascia board with company name & stand number.</li>
            <li>White partitions.</li>
            <li>Needle-punched carpeting.</li>
            <li>Single-phase electrical socket (220V - 240V).</li>
            <li>2 fluorescent lights.</li>
            <li>2 folding chairs.</li>
            <li>1 information counter.</li>
            <li>1 waste paper basket.</li>
          </ul>
          <p className="desc-sponser">
            Once the sponsor completes the options, they will have the option to
            upload the agreement. After signing, a financial claim will be sent
            for the fees.
          </p>
          <p>
            For special buildup booths and other special requirements, please
            contact the organizers:
            <a href="mailto:admin@eventcons.com">admin@eventcons.com</a>
          </p>

          {floorPlanUrl && (
            <a
              href={floorPlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-floor-plans-btn"
            >
              <button className="view-floor-plans-button">
                View Floor Plans
              </button>
            </a>
          )}
        </div>
      </div>
      {floorPlanUrl && (
        <div className="input-container">
          <label htmlFor="exhibitNumber" className="input-label">
            Enter Exhibit Number:
          </label>
          <input
            type="text"
            id="exhibitNumber"
            placeholder="Enter the exhibit number"
            className="input-field"
            onChange={(e) => onExhibitNumberChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

const BoothCostTable = ({
  selectedBoothIds,
  onSelectBooth,
  shellSchemeSelected,
  onShellSchemeChange,
  onShellSchemePriceChange, // دالة لتمرير السعر إلى SponsorSection
  onSquareMetersChange, // دالة لتمرير الأمتار المربعة إلى SponsorSection
  shellSchemePrice,
  setShellSchemePrice,
  squareMeters,
  setSquareMeters,
}) => {
  const [boothData, setBoothData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const { myConferenceId } = useAuth();
  const [standDepth, setStandDepth] = useState(0);
  const [standPrice, setStandPrice] = useState(0);

  const fetchFloorPlan = async () => {
    if (!myConferenceId) return;

    try {
      const response = await axios.get(
        `${BaseUrl}/floor/plan/${myConferenceId}`
      );
      setShellSchemePrice(response?.data.data[0].shell_scheme_price_per_sqm);
      setStandDepth(response?.data.data[0].space_only_stand_depth);
      setStandPrice(response?.data.data[0].space_only_stand_price_usd);
      onShellSchemePriceChange(
        response?.data.data[0].shell_scheme_price_per_sqm
      ); // تمرير السعر
    } catch (error) {}
  };

  useEffect(() => {
    if (myConferenceId) {
      fetchFloorPlan();
    }
  }, [myConferenceId]);

  useEffect(() => {
    console.log("Shell scheme price:", shellSchemePrice);
    console.log("Square meters:", squareMeters);
  }, [shellSchemePrice, squareMeters]);

  const fetchData = async () => {
    try {
      if (!myConferenceId) return;

      const response = await axios.get(
        `${BaseUrl}/size/table/admin/get/${myConferenceId}`
      );
      const { boothCosts } = response.data;

      setBoothData(boothCosts);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (myConferenceId) {
      fetchData();
    }
  }, [myConferenceId]);

  const handleClick = (boothId) => {
    const isSelected = selectedBoothIds.includes(boothId);
    onSelectBooth(boothId, !isSelected);
  };

  const handleCheckboxChange = (event, boothId) => {
    const isChecked = event.target.checked;
    onSelectBooth(boothId, isChecked);
  };

  const handleSquareMetersChange = (event) => {
    const value = event.target?.value;
    setSquareMeters(value);
    onSquareMetersChange(value); // تمرير الأمتار المربعة
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="error-message">{error}</p>;
  return (
    Array.isArray(boothData) &&
    boothData.length > 0 && (
      <div className="booth-cost-table">
        <div className="booth-cost-table-header3">Booth Cost Table</div>
        <h5 className="booth-cost-table-description">
          Space only stand USD {standPrice} Per Meter - Depth = {standDepth}
        </h5>
        <div className="con-booth-cost-table-table">
          <table className="booth-cost-table-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Booth Size (LM)</th>
                <th className="table-header-cell">Cost (USD)</th>
                <th className="table-header-cell">Lunch Invitations</th>
                <th className="table-header-cell">Name Tags</th>
                <th className="table-header-cell">Selected</th>
              </tr>
            </thead>
            <tbody>
              {boothData.map((booth) => (
                <tr key={booth.id} className="table-row">
                  <td className="table-cell">
                    {booth.name}{" "}
                    {selectedBoothIds.includes(booth.id) ? "(Selected)" : ""}
                  </td>
                  <td className="table-cell">{booth.cost}</td>
                  <td className="table-cell">{booth.lunch_invitations}</td>
                  <td className="table-cell">{booth.name_tags}</td>
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={selectedBoothIds.includes(booth.id)}
                      onChange={(e) => handleCheckboxChange(e, booth.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="shell-scheme">
          <input
            type="checkbox"
            checked={shellSchemeSelected}
            onChange={onShellSchemeChange}
          />
          <span className="shell-scheme-text">
            Additional cost for Shell Scheme Booth (special build-up booth):{" "}
            <strong className="shell-scheme-cost">
              {shellSchemePrice} USD per square meter.
            </strong>
          </span>
          {/* حقل إدخال الأمتار المربعة */}
          {shellSchemeSelected && (
            <div className="input-group">
              <Input
                label="Enter square meters:"
                // type="number"
                placeholder="Enter square meters:"
                inputValue={squareMeters}
                setInputValue={setSquareMeters}
                // onSquareMetersChange={setSquareMeters}
                required={true}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};

const SponsorSection = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [isAgreementSigned, setIsAgreementSigned] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSponsorshipIds, setSelectedSponsorshipIds] = useState([]);
  const [chosenBooths, setChosenBooths] = useState([]);
  const [exhibitNumber, setExhibitNumber] = useState("");
  const [shellSchemeSelected, setShellSchemeSelected] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [shellSchemePrice, setShellSchemePrice] = useState(0);
  const [squareMeters, setSquareMeters] = useState(0);
  const [viewSubmit, setViewSubmit] = useState(false);

  const handleShellSchemeChange = (event) => {
    setShellSchemeSelected(event.target.checked);
  };

  const navigate = useNavigate();
  const handleSelectBooth = (boothId, isSelected) => {
    setChosenBooths((prevIds) => {
      if (isSelected) {
        return [...prevIds, boothId];
      } else {
        return prevIds.filter((id) => id !== boothId);
      }
    });
  };
  const handleShellSchemePriceChange = (price) => {
    setShellSchemePrice(price); // تحديث السعر
  };

  const handleSquareMetersChange = (meters) => {
    setSquareMeters(meters); // تحديث الأمتار المربعة
  };

  const handleSelectedSponsorshipsChange = (ids) => {
    setSelectedSponsorshipIds(ids);
  };

  const handleExhibitNumberChange = (number) => {
    setExhibitNumber(number);
  };

  const openAgreementPopup = () => {
    setIsPopupOpen(true);
  };

  const handleSignAgreement = () => {
    setIsAgreementSigned(true);
    setIsPopupOpen(false);
    toast.success("Agreement signed successfully!");
    setViewSubmit(true);
  };

  const { myConferenceId } = useAuth();

  const getSponsorshipOptions = async () => {
    if (!myConferenceId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BaseUrl}/sponsorship-options/${myConferenceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching sponsorship options:", error);
    }
  };

  useEffect(() => {
    if (myConferenceId) {
      getSponsorshipOptions();
    }
  }, [myConferenceId]);

  const handleSelectOption = (id, isSelected) => {
    setSelectedOptionIds((prevIds) => {
      if (isSelected) {
        return [...prevIds, id];
      } else {
        return prevIds.filter((optionId) => optionId !== id);
      }
    });
  };

  const { userId } = useAuth();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      user_id: userId,
      // user_name: "John Doe",
      conference_sponsorship_option_ids: selectedSponsorshipIds,
      booth_cost_ids: chosenBooths,
      sponsorship_option_ids: selectedOptionIds,
      conference_id: myConferenceId,
      additional_cost_for_shell_scheme_booth: shellSchemeSelected,
      exhibit_number: exhibitNumber,
      shell_scheme_price: shellSchemePrice, // إضافة السعر
      square_meters: squareMeters,
    };
    console.log(squareMeters);

    try {
      const response = await axios.post(`${BaseUrl}/invoice`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // تمرير التوكن
        },
      });
      console.log("Response data:", response.data);
      toast.success(
        "The options have been successfully registered as a sponsor for this event."
      );
      navigate("/sponsor/invoice");
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Failed to submit data. Please try again."
      );
    }
  };

  // Fetch the token from localStorage
  const getAuthToken = () => localStorage.getItem("token");

  const getInvoice = () => {
    axios
      .get(`${BaseUrl}/invoice/${myConferenceId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => {
        setInvoiceData(response.data.invoices[0]);
      })
      .catch((error) => {
        console.error("Error fetching invoice data:", error);
      });
  };

  useEffect(() => {
    getInvoice();
  }, [myConferenceId]);

  return (
    <div className="sponsor-section">
      {/* شرط عرض مكون الفاتورة أو الخيارات بناءً على وجود invoiceData */}
      {invoiceData ? (
        <SponsorInvoice data={invoiceData} /> // إذا كانت invoiceData موجودة، يتم عرض هذا المكون
      ) : (
        <div>
          {options && options.length > 0 && (
            <div className="header-sponsorship-opportunities">
              Sponsorship Opportunities
            </div>
          )}

          <div className="sponsorship-options-sect">
            {options.map((option) => (
              <SponsorshipOption
                key={option.id}
                id={option.id}
                title={option.title}
                description={option.description}
                price={option.price}
                onSelect={handleSelectOption}
              />
            ))}
          </div>

          <SponsorshipTable
            onSelectedSponsorshipsChange={handleSelectedSponsorshipsChange}
          />
          <BoothCostTable
            selectedBoothIds={chosenBooths}
            onSelectBooth={handleSelectBooth}
            shellSchemeSelected={shellSchemeSelected}
            onShellSchemeChange={handleShellSchemeChange}
            onShellSchemePriceChange={handleShellSchemePriceChange} // تمرير دالة السعر
            onSquareMetersChange={handleSquareMetersChange}
            shellSchemePrice={shellSchemePrice}
            setShellSchemePrice={setShellSchemePrice}
            squareMeters={squareMeters}
            setSquareMeters={setSquareMeters}
          />
          <StandardBoothPackage
            onExhibitNumberChange={handleExhibitNumberChange}
          />
          <div className="button-container-list">
            {!viewSubmit && (
              <button
                className="Sign-Agreement-button"
                onClick={openAgreementPopup}
              >
                Sign Agreement
              </button>
            )}
            {viewSubmit && (
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
            )}
          </div>

          {isAgreementSigned && (
            <div className="agreement-status">
              <p>Your agreement has been signed successfully!</p>
            </div>
          )}

          {isPopupOpen && (
            <div className="agreement-popup">
              <div className="popup-content">
                <h3>Agreement for Sponsorship</h3>
                <p>
                  By signing this agreement, you confirm your commitment to
                  sponsor the event...
                </p>
                <div className="popup-buttons">
                  <button onClick={handleSignAgreement} className="btn-sign">
                    Sign Agreement
                  </button>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SponsorSection;
