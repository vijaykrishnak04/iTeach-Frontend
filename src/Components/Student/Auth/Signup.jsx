import { useState } from "react";
import validator from "validator";
import { useDispatch } from "react-redux";
import { StudentAuth } from "../../../Redux/Features/Student/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State to hold user input
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const errors = {};

    if (!fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!validator.isNumeric(phoneNumber) || phoneNumber.length !== 10) {
      errors.phoneNumber = "Invalid phone number";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const errors = validate();

      if (Object.keys(errors).length === 0) {
        // Add signup logic here (e.g., API call)
        const values = {
          fullName,
          email,
          password,
          confirmPassword,
          phoneNumber,
        };
        dispatch(StudentAuth(values)).then((response) => {
          if (response) {
            navigate("/otp-page"); 
          }
        });
      } else {
        console.log("Validation Errors:", errors);
      }
    } catch(err) {
      toast.error(err.response.data.error);
      console.log(err.response);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-orange-300 p-8 h-80 w-96 flex justify-center">
        <div>
          <div className="flex justify-center">
            <p>Hey! Welcome</p>
          </div>

          <div>
            <img src="/pngwing.com.png" alt="childrens in class" />
          </div>
        </div>
      </div>
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
