/* eslint-disable react/prop-types */
import { useState } from "react";
import validator from "validator";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AddTeacherModal = ({ isOpen, onClose, subjects, onAddTeacher }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = () => {
    // Perform validation
    const errors = {};

    if (validator.isEmpty(fullName.trim())) {
      errors.fullName = "Full Name is required";
    }

    if (validator.isEmpty(email.trim())) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "invalid email format";
    }

    if (validator.isEmpty(qualification.trim())) {
      errors.qualification = "Qualification is required";
    }

    if (validator.isEmpty(password.trim())) {
      errors.password = "Password is required";
    } else if (!validator.isStrongPassword(password)) {
      errors.password = "Your password should be stronger";
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
        qualification,
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
    <Modal
      title="Add Teacher" // Title based on mode
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="text-center"
    >
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className={`w-full p-2 border my-2 rounded ${
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
        type="text"
        placeholder="Qualification"
        value={qualification}
        onChange={(e) => setQualification(e.target.value)}
        className={`w-full p-2 border mb-2 rounded ${
          errors.qualification ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.qualification && (
        <p className="text-red-500 text-sm mb-2">{errors.qualification}</p>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
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
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => togglePasswordVisibility("password")}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
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
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => togglePasswordVisibility("confirmPassword")}
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </button>
      </div>
      <select
        className={`w-full p-2 border mb-4 rounded ${
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
        onClick={() => {
          onClose();
          setErrors([]);
        }}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default AddTeacherModal;
