import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../../CoreComponent/ImageUpload";
import "./style.scss";
import Select from "../../CoreComponent/Select";
import toast from "react-hot-toast";
import Input from "../../CoreComponent/Input"; // Assuming you have this custom Input component

const FloorPlanUploader = () => {
  const [file, setFile] = useState("");
  const [agreementFile, setAgreementFile] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [allConference, setAllConference] = useState([]);
  const [conferenceId, setConferenceId] = useState(null);
  const [shellSchemePrice, setShellSchemePrice] = useState("");
  const [standDepth, setStandDepth] = useState("");
  const [standPrice, setStandPrice] = useState("");

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // جلب قائمة المؤتمرات
  const getConference = () => {
    const url = `${BaseUrl}/conferences/all`;

    axios
      .get(url)
      .then((response) => {
        setAllConference([
          { label: "None", value: null },
          ...response.data.data?.map((item) => {
            return { label: item?.title, value: item?.id };
          }),
        ]);
      })
      .catch((error) => {
        console.error("Error fetching conferences:", error);
      });
  };

  useEffect(() => {
    getConference();
  }, []);

  // رفع البيانات إلى الخادم
  const handleSubmit = async () => {
    if (!file || !conferenceId || !shellSchemePrice || !standDepth || !standPrice) {
      setMessage("Please fill all fields and select a file.");
      return;
    }
    const token = localStorage.getItem("token");
    const url = `${BaseUrl}/floor/plan`;
    const formData = new FormData();

    formData.append("floor_plan", file);
    formData.append("agreement_page", agreementFile);

    formData.append("conference_id", conferenceId.value);
    formData.append("shell_scheme_price_per_sqm", shellSchemePrice);
    formData.append("space_only_stand_depth", standDepth);
    formData.append("space_only_stand_price_usd", standPrice);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("File and data uploaded successfully!");

    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred during upload.";
      toast.error(errorMessage);
      console.log(errorMessage); // عرض رسالة الخطأ
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container555">
      <h3>Upload Floor Plan PDF</h3>
      <Select
        options={allConference}
        value={conferenceId}
        setValue={setConferenceId}
        label="Conference Id"
        errorMsg={""}
      />

      <ImageUpload
        label="Floor Plan Upload"
        inputValue={file}
        setInputValue={setFile}
        allowedExtensions={["pdf"]}
      />
            <ImageUpload
        label="Agreement Page"
        inputValue={agreementFile}
        setInputValue={setAgreementFile}
        allowedExtensions={["jpeg", "png", "jpg","pdf"]}
        />

      {/* إدخال السعر لكل متر مربع */}
      <div className="input-group">
        {/* <label htmlFor="shell_scheme_price">Shell Scheme Price (per sqm):</label>
        <input
          type="number"
          id="shell_scheme_price"
          value={shellSchemePrice}
          onChange={(e) => setShellSchemePrice(e.target.value)}
        /> */}
        <Input
          label="Shell Scheme Price (per sqm):"
          type="number"
          placeholder="Enter Shell Scheme Price"
          inputValue={shellSchemePrice}
          setInputValue={setShellSchemePrice}
          required={true}
        />
      </div>

      {/* إدخال العمق */}
      <div className="input-group">
        {/* <label htmlFor="stand_depth">Stand Depth (meters):</label>
        <input
          type="number"
          id="stand_depth"
          value={standDepth}
          onChange={(e) => setStandDepth(e.target.value)}
        /> */}
        <Input
          label="Stand Depth (meters):"
          type="number"
          placeholder="Enter Stand Depth "
          inputValue={standDepth}
          setInputValue={setStandDepth}
          required={true}
        />
      </div>

      {/* إدخال السعر لكل متر */}
      <div className="input-group">

        <Input
          label="Stand Price (USD per meter):"
          type="number"
          step="0.01"
          placeholder="Enter Stand Price"
          inputValue={standPrice}
          setInputValue={setStandPrice}
          required={true}
        />
      </div>

      {/* رسالة الحالة */}
      {message && <p>{message}</p>}

      {/* زر إرسال */}
      <button onClick={handleSubmit} disabled={loading} className="submit-button">
        {loading ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
};

export default FloorPlanUploader;
