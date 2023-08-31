import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import validator from "validator"; // Import the validator library
import { otpData } from "../../../Redux/Features/Student/OtpSlice";
import { Modal } from "antd";

const OTPPage = ({ isVisible, onClose }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(() => {
    const storedTimer = sessionStorage.getItem("otpTimer");
    return storedTimer ? JSON.parse(storedTimer) : 60;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const StudentAuth = useSelector(
    (state) => state?.studentData?.studentData?.response
  );

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate the entered OTP using the validator library
      if (!validator.isNumeric(otp) || otp.length !== 6) {
        message.error(
          "Invalid OTP format. Please enter a valid 6-digit numeric OTP."
        );
        return;
      }

      const dataToSend = {
        ...StudentAuth,
        otp: otp,
      };
      const response = await dispatch(otpData(dataToSend));
      if (response) {
        console.log(response);
        navigate("/login");
        message.success("OTP Verified Successfully");
        onClose();
      }
    } catch (error) {
      console.log("Error occurred during OTP confirmation:", error);
    }
  };

  const handleResend = () => {
    // Here you can add the logic to resend the OTP.
    setTimer(60); // Reset the timer to 30 seconds when the resend button is clicked.
  };

  useEffect(() => {
    // Timer logic to decrement the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0)); // Ensure the timer doesn't go negative
    }, 1000);

    // Clear the interval when the component is unmounted or timer reaches 0
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Persist the timer in session storage
    sessionStorage.setItem("otpTimer", JSON.stringify(timer));
  }, [timer]);

  return (
    <Modal
      title="Enter OTP"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded border"
          maxLength={6}
          pattern="[0-9]{6}"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
        {timer > 0 && (
          <p className="mt-2 text-center">Resend OTP in {timer} seconds</p>
        )}
        {timer === 0 && (
          <button
            type="button"
            onClick={handleResend}
            className="mt-2 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Resend OTP
          </button>
        )}
      </form>
    </Modal>
  );
};

export default OTPPage;
