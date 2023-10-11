import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudentAuth } from "../../../Redux/Features/Student/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import OTPPage from "../Otp/Otp";
import { StudentOtpApi } from "../../../Services/LandingService";
import validator from "validator";

const Signup = () => {
  // State to hold user input
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation function

  const handlePhoneNumberChange = (e) => {
    const currentValue = e.target.value;
    setPhoneNumber(currentValue);
    validatePhoneNumber(currentValue);
  };

  const validatePhoneNumber = (value) => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(value)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleEmailChange = (e) => {
    const currentValue = e.target.value;
    setEmail(currentValue);
    validateEmail(currentValue);
  };

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const currentValue = e.target.value;
    setPassword(currentValue);
    validatePassword(currentValue);
  };

  const validatePassword = (value) => {
    if (!validator.isStrongPassword(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const currentValue = e.target.value;
    setConfirmPassword(currentValue);
    validateConfirmPassword(currentValue, password); // pass the password as the second argument
  };

  const validateConfirmPassword = (value, pass) => {
    if (value !== pass) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission

    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      phoneNumberError
    ) {
      return;
    }

    const values = {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    };

    setIsLoading(true);
    dispatch(StudentAuth(values))
      .then((response) => {
        if (StudentAuth.fulfilled.match(response)) {
          setIsLoading(false);
         
          setIsOTPModalVisible(true);
        } else if (response.error || StudentAuth.rejected.match(response)) {
          setIsLoading(false);
          setEmailError(response.payload.error);
          toast.error(response.error.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.error);
        console.log(err.response);
      });
  };

  const Student = useSelector(
    (state) => state?.studentData?.studentData?.response
  );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-zinc-800">
        <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className=" text-white lg-p-8 w-full md:w-1/2 flex flex-col justify-center items-center">
              <p className="text-2xl font-semibold mb-4 text-black">
                Hey! Welcome
              </p>
              <img
                src="/pngwing.com.png"
                alt="childrens in class"
                className="w-3/4 hidden md:block"
              />
            </div>
            <div className="p-8 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Full Name Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 px-4 py-2 w-full rounded-lg focus:outline-none border focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${
                        emailError ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`mt-1 px-4 py-2 w-full rounded-lg focus:outline-none ${
                        emailError
                          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : "border focus:border-blue-500"
                      }`}
                      required
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">Oops!</span> {emailError}
                      </p>
                    )}
                  </div>

                  {/* password input*/}
                  <div className="mb-4 relative">
                    <label
                      htmlFor="password"
                      className={`block text-sm font-medium ${
                        passwordError ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`mt-1 px-4 py-2 w-full rounded-lg focus:outline-none ${
                        passwordError
                          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : "border focus:border-blue-500"
                      }`}
                      required
                    />
                    <span className="absolute right-2 top-2/3 transform -translate-y-1/2 cursor-pointer">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={handleTogglePassword}
                      />
                    </span>
                    {passwordError && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">Oops!</span>{" "}
                        {passwordError}
                      </p>
                    )}
                  </div>
                  {/* confirm password input*/}
                  <div className="mb-4 relative">
                    <label
                      htmlFor="confirmPassword"
                      className={`block text-sm font-medium ${
                        confirmPasswordError ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      Confirm password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={`mt-1 px-4 py-2 w-full rounded-lg focus:outline-none ${
                        confirmPasswordError
                          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : "border focus:border-blue-500"
                      }`}
                      required
                    />
                    <span className="absolute right-2 top-2/3 transform -translate-y-1/2 cursor-pointer">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={handleTogglePassword}
                      />
                    </span>
                    {confirmPasswordError && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">Oops!</span>{" "}
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                  {/* password input*/}
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-medium ${
                        phoneNumberError ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      phoneNumber
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className={`mt-1 px-4 py-2 w-full rounded-lg focus:outline-none ${
                        phoneNumberError
                          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : "border focus:border-blue-500"
                      }`}
                      required
                    />
                    {phoneNumberError && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">Oops!</span>{" "}
                        {phoneNumberError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-3xl w-60 h-14 font-bold text-white bg-green-900 hover:bg-green-700 focus:outline-none transition-all duration-300"
                  >
                    {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}{" "}
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-500 mt-2 hover:underline"
                  >
                    Already have an account? login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <OTPPage
          isVisible={isOTPModalVisible}
          onClose={() => setIsOTPModalVisible(false)}
          StudentAuth={Student}
          StudentOtpApi={StudentOtpApi}
        />
      </div>
    </>
  );
};

export default Signup;
