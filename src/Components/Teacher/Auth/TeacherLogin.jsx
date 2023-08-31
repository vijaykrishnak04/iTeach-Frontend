import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherLoginApi } from "../../../Services/Teacher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added to control password visibility

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    const formData = {
      email: email,
      password: password,
    };

    teacherLoginApi(formData)
      .then((responce) => {
        if (responce.data.success) {
          const jwtToken = responce.data.token;

          localStorage.setItem("teacherToken", jwtToken);
          navigate("/teacher/home");
        } else {
          setPasswordError(responce.data.errors);
        }
      })
      .catch((error) => {
        setPasswordError(
          error.response ? error.response.data.message : "An error occurred."
        );
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="text-white p-8 w-full md:w-1/2 flex flex-col justify-center items-center">
            <p className="text-2xl font-semibold mb-4 text-black">
              Hey, Teacher!
            </p>
            <img src="/pngwing.com.png" alt="teacher" className="w-3/4" />
          </div>
          <div className="p-8 w-full md:w-1/2">
            <div className="p-8">
              <h2 className="text-2xl mb-4 text-center font-bold underline">
                TEACHER LOGIN
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-center w-[300px]">
                      {emailError}
                    </p>
                  )}
                </div>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
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
                    <p className="text-red-500 text-center w-[300px]">
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="flex justify-center mb-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-3xl w-60 h-14 font-bold text-white bg-green-900 hover:bg-green-700 focus:outline-none"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
