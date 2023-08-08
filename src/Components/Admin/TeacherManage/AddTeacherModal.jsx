/* eslint-disable react/prop-types */
import { useState } from "react";
import validator from "validator";

const AddTeacherModal = ({ isOpen, onClose, subjects, onAddTeacher }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [errors, setErrors] = useState({});
  
    const handleSubmit = () => {
      // Perform validation
      const errors = {};
  
      if (validator.isEmpty(fullName)) {
        errors.fullName = "Full Name is required";
      }
  
      if (!validator.isEmail(email)) {
        errors.email = "Invalid email format";
      }
  
      if (validator.isEmpty(password)) {
        errors.password = "Password is required";
      }
  
      if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = "Passwords do not match";
      }
  
      if (!selectedSubject) {
        errors.subject = "Please select a Subject";
      }
  
      if (Object.keys(errors).length === 0) {
        // If there are no errors, add teacher and close the modal
        onAddTeacher({
          fullName,
          email,
          password,
          subject: selectedSubject,
        });
        onClose();
      } else {
        // If there are errors, update the state with the error messages
        setErrors(errors);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-white rounded-md p-6 w-80">
          <h2 className="text-lg font-semibold mb-4">Add Teacher</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full p-2 border mb-2 rounded ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mb-2">{errors.fullName}</p>
          )}
  
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border mb-2 rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
  
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border mb-2 rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}
  
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-2 border mb-2 rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>
          )}
  
          <select
            className={`w-full p-2 border mb-2 rounded ${
              errors.subject ? "border-red-500" : "border-gray-300"
            }`}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="" disabled>
              Select a Subject
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mb-2">{errors.subject}</p>
          )}
  
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            onClick={handleSubmit}
          >
            Add Teacher
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  export default AddTeacherModal;