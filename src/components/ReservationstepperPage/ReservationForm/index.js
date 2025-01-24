import React, { useEffect, useState } from "react";
import Input from "../../../CoreComponent/Input";
import Checkbox from "../../../CoreComponent/Checkbox/index";
import DateInput from "../../../CoreComponent/Date";
import toast from "react-hot-toast";
import { useStepper } from "../StepperContext";
import "./style.scss";
import Select from "../../../CoreComponent/Select";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../common/AuthContext";


const ReservationForm = () => {
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    completeStep,
    //this is states
    roomType,
    setRoomType,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    lateCheckOut,
    setLateCheckOut,
    earlyCheckIn,
    setEarlyCheckIn,
    totalNights,
    setTotalNights,
  } = useStepper();
  const { myConferenceId } = useAuth();  // جلب conferenceId من هوك الاستخدام
  const [hotel, setHotel] = useState(null);  // حالة لتخزين الأسعار
  const [loading, setLoading] = useState(true);  // حالة لتحميل البيانات
  const [error, setError] = useState(null);  // حالة للتعامل مع الأخطاء
  const options = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
    { value: "Triple", label: "Triple" },
  ];
  const handleSubmit = (e) => {
    toast.success("The data was updated successfully!");
    const formData = {
      checkInDate,
      checkOutDate,
      lateCheckOut,
      earlyCheckIn,
      totalNights,
      roomType,
    };
    completeStep(currentStep);
  };
  const BaseUrl = process.env.REACT_APP_BASE_URL;  // رابط قاعدة البيانات

  // دالة للحصول على أسعار الغرف
  const getPricesRoom = async () => {
    const token = localStorage.getItem("token");  // جلب التوكن من المحل المحلي

    try {
      setLoading(true);  // تفعيل التحميل
      const response = await axios.get(`${BaseUrl}/room-prices/${myConferenceId}`, {
        headers: {
          Authorization: `Bearer ${token}`  // تمرير التوكن مع الطلب
        }
      });
      setLoading(false);
      // setHotel(response.data.data.hotel_name);  // حفظ البيانات في الحالة
      console.log(response.data.data.hotel_name);
      const hotel = response.data.data.hotel_name
      setHotel(hotel)


    } catch (err) {
      setError("Failed to load room prices.");  // في حال وجود خطأ
    }
  };

  useEffect(() => {
    getPricesRoom();  // استدعاء الدالة عند تحميل المكون
  }, [myConferenceId]);  // إعادة تحميل البيانات إذا تغير المؤتمر

  if (loading) {
    return <div>Loading...</div>;  // عرض الرسالة أثناء التحميل
  }

  if (error) {
    return <div>{error}</div>;  // عرض الخطأ في حال حدوثه
  }


  return (
    <>
      <form >
        <div className="hotel-name-container">
          {hotel ? <span className="hotel-name">{hotel}</span> : "Loading hotel..."}
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Select
              options={options}
              value={roomType}
              setValue={setRoomType}
              label="Room Type"
              required={true}
            />
          </Grid>

          {/* Check In Date */}
          <Grid item xs={12} >
            <DateInput
              label="Check In Date"
              type="datetime-local"
              inputValue={checkInDate}
              setInputValue={setCheckInDate}
            />
          </Grid>

          <Grid item xs={12} >
            <DateInput
              label="Check Out Date"
              type="datetime-local"
              inputValue={checkOutDate}
              setInputValue={setCheckOutDate}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="check-in-input-container">
              <Checkbox
                label="Early Check In?"
                checkboxValue={earlyCheckIn}
                setCheckboxValue={setEarlyCheckIn}
                icon={""}
                errorMsg={""}
              />
            </div>
          </Grid>



          {/* Late Check Out */}
          <Grid item xs={12} sm={6}>
            <Checkbox
              label="Late Check Out?"
              checkboxValue={lateCheckOut}
              setCheckboxValue={setLateCheckOut}
              icon={""}
              errorMsg={""}
            />
          </Grid>
          {/* Total Nights */}
          <Grid item xs={12} >
            <Input
              label="Total Nights"
              type="number"
              inputValue={totalNights}
              setInputValue={setTotalNights}
              placeholder="Enter total nights"
            />
          </Grid>
        </Grid>
      </form>
      <div className="actions-section">
        <Button
          className={`next-button ${!checkInDate || !checkOutDate || !totalNights || !roomType
              ? "disabled"
              : ""
            }`}
          variant="contained"
          sx={{
            backgroundColor: '#c62828',// Modern vibrant red

            marginTop: "20px",
            color: "#fff",
            width: "100%",

            "&:hover": {
              backgroundColor: "#e63946",
              color: "#fff",
            }
          }}

          onClick={() => {
            handleSubmit();
          }}
          disabled={!checkInDate || !checkOutDate || !totalNights || !roomType}
        >
          Next

        </Button>
      </div>
    </>
  );
};

export default ReservationForm;
