import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StudentLogin } from "../../../Redux/Features/Student/AuthSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordModal from "./ForgotPasswordModal";
const Login = () => {
  // State to hold the user's input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalvisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleEmailChange = (e) => {
    const currentValue = e.target.value;
    setEmail(currentValue);
    validateEmail(currentValue); // Add this line
  };

  const handlePasswordChange = (e) => {
    setPasswordError("");
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();

    if (emailError || passwordError) {
      // If there's an error, we stop here and don't proceed with the login attempt.
      return;
    }

    const formData = {
      email: email,
      password: password,
    };

    setIsLoading(true);
    dispatch(StudentLogin(formData))
      .then((responseAction) => {
        if (StudentLogin.fulfilled.match(responseAction)) {
          const jwtToken = responseAction.payload.token;
          localStorage.setItem("studentToken", jwtToken);
          navigate("/student/home");
        } else if (StudentLogin.rejected.match(responseAction)) {
          setIsLoading(false);
          if (
            responseAction.payload.message ===
            "The user with the email does not exist"
          ) {
            setEmailError(responseAction.payload.message);
          } else {
            setPasswordError(responseAction.payload.message);
          }
        }
      })
      .catch((error) => {
        setPasswordError(error.message ? error.message : "An error occurred.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="text-white p-8 w-full md:w-1/2 flex flex-col justify-center items-center">
            <p className="text-2xl font-semibold mb-4 text-black">
              Hey! Welcome
            </p>
            <img
              src="/pngwing.com.png"
              alt="childrens in class"
              className="w-3/4"
            />
          </div>
          <div className="p-8 w-full md:w-1/2">
            <div className="p-8">
              <h2 className="text-2xl mb-4 text-center font-bold underline">
                STUDENT LOGIN
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${
                      emailError
                        ? "text-red-700 dark:text-red-500"
                        : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`mt-1 px-4 py-2 w-full rounded-lg focus:outline-none ${
                      emailError
                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                        : "border focus:border-blue-500"
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span> {emailError}
                    </p>
                  )}
                </div>
                <div className="mb-3 relative">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${
                      passwordError
                        ? "text-red-700 dark:text-red-500"
                        : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`mt-1 px-4 py-2 w-full rounded-lg focus:outline-none ${
                        passwordError
                          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : "border focus:border-blue-500"
                      }`}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span> {passwordError}
                    </p>
                  )}
                </div>

                <div className="flex justify-end mb-3">
                  <button
                    type="button"
                    onClick={() => setIsModalVisible(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="flex justify-center mb-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-3xl w-60 h-14 font-bold text-white bg-green-900 hover:bg-green-700 focus:outline-none"
                  >
                    {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}{" "}
                    LOGIN
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-blue-500 hover:underline"
                  >
                    Don`t have an account? Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ForgotPasswordModal
          isVisible={isModalvisible}
          onClose={() => setIsModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default Login;
