import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import Select from "../../CoreComponent/Select";

const ClosingDateForm = () => {
  // حالة لتخزين القيم
  const [type, setType] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [conferenceId, setConferenceId] = useState("");  // State to store the selected conference
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [allConference, setAllConference] = useState([]);
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // Fetch all conferences
  const getConference = () => {
    const token = localStorage.getItem("token");
    const url = `${BaseUrl}/conferences/all`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllConference(
          response.data.data?.map((item) => ({
            label: item?.title,
            value: item?.id,
          }))
        );
      })
      .catch((error) => {
        setError("Error fetching conferences");
      });
  };

  useEffect(() => {
    getConference();
  }, []);

  // وظيفة إرسال البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); // أخذ التوكن من LocalStorage
    
    // التحقق من وجود التوكن
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    if (!conferenceId) {
      setError("Please select a conference.");
      return;
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/closing/date`,
        {
          type,
          closing_date: closingDate,
          conference_id: conferenceId.value, // إضافة ID المؤتمر المختار
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة التوكن إلى الهيدر
          },
        }
      );
      setSuccess(true);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save closing date");
      setSuccess(false);
    }
  };

  return (
    <div className="closing-date-container">
      <h2>Set Closing Date</h2>
      <form onSubmit={handleSubmit}>
        {success && <div className="alert success">Closing Date Saved Successfully!</div>}
        {error && <div className="alert error">{error}</div>}

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="abstract">Abstract</option>
            <option value="accommodation">Accommodation</option>
          </select>
        </div>

        <div className="form-group">
          <Select
            options={allConference}
            value={conferenceId}
            setValue={setConferenceId}
            label="Select Conference"
            placeholder="Select..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="closing_date">Closing Date:</label>
          <input
            type="datetime-local"
            id="closing_date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            required
          />
        </div>

        <button
          style={{
            backgroundColor:'#9B1321'
          }}
          type="submit" className="btn-submit">
          Save Closing Date
        </button>
      </form>
    </div>
  );
};

export default ClosingDateForm;
