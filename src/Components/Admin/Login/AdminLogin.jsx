import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginApi } from "../../../Services/Admin";

const AdminLogin = () => {
  // State to hold the user's input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
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
      password: password
    };

    adminLoginApi(formData).then((responce)=>{
      if(responce.data.status){
        const jwtToken = responce.data.token;
        localStorage.setItem("adminToken",jwtToken);
        navigate('/admin/dashBoard');
      }else{
        setPasswordError(responce.data.errors)
      }
    }).catch((error)=>{
      console.log(error);
    })
  };

  return (
    <div className="p-8 w-96">
      <h2 className="text-2xl mb-4 text-center font-bold underline">MAIN ADMIN LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
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
              <p className="text-red-500 text-center w-[300px]">{emailError}</p>
            )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && (
              <p className="text-red-500 text-center w-[300px]">{passwordError}</p>
            )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 rounded-3xl w-60 h-14 font-bold text-white bg-green-900 hover:bg-green-700 focus:outline-none"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
