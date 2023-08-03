/* eslint-disable react/prop-types */
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { message } from "antd";
import {
  addTeacherApi,
  blockTeacherApi,
  unblockTeacherApi,
  deleteTeacherApi,
} from "../../../Services/Admin";
import { getTeachers } from "../../../Redux/Features/Admin/getTeachers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";

// Modal component for adding a teacher
// eslint-disable-next-line react/prop-types
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

const TeacherManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState(
    useSelector((state) => state.teacherData.teacherList)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const subjects = ["Math", "Science", "English"];

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    dispatch(getTeachers(headers));
  }, [dispatch]);

  const handleAddTeacher = (teacher) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("adminToken"),
      };
      addTeacherApi(teacher, headers)
        .then((response) => {
          console.log(response);
          if (response.data.error) {
            console.log(response.data.message);
            // setError(response.data.error);
          } else {
            message.success("Added Teacher successfully");
            setTeachers((prevTeachers) => [...prevTeachers, response.data]);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlockTeacher = (teacherId) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("adminToken"),
      };
      blockTeacherApi(teacherId, headers)
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.message);
            toast.error(response.data.message);
          } else {
            message.success("Teacher blocked successfully");
            // Assuming response.data contains the updated list of teachers
            setTeachers(response.data);
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleUnblockTeacher = (teacherId) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("adminToken"),
      };
      unblockTeacherApi(teacherId, headers)
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.message);
            toast.error(response.data.message);
          } else {
            message.success("Teacher unblocked successfully");
            // Assuming response.data contains the updated list of teachers
            setTeachers(response.data);
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleRemoveTeacher = (teacherId) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("adminToken"),
      };
      deleteTeacherApi(teacherId, headers)
        .then((response) => {
          if (response.data.error) {
            console.error(response.data.message);
            toast.error(response.data.message);
          } else {
            message.success("Teacher removed successfully");
            // Assuming response.data contains the updated list of teachers
            setTeachers(response.data);
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="mt-10 p-10">
      <p className="text-lg font-bold mt-5">Teacher Management</p>
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={() => setIsModalOpen(true)}
        >
          Add Teacher
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {teacher.fullName}
                </th>
                <td className="px-6 py-4">{teacher.email}</td>
                <td className="px-6 py-4">{teacher.subject}</td>
                <td className="px-6 py-4 text-left">
                  {/* Action buttons (Block and Remove) */}
                  <div className="p-1">
                    {teacher.isBlocked === false ? (
                      <button
                        onClick={() => handleBlockTeacher(teacher._id)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockTeacher(teacher._id)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => handleRemoveTeacher(teacher._id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
      {/* Modal for adding a teacher */}
      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subjects={subjects}
        onAddTeacher={handleAddTeacher}
      />
    </div>
  );
};

export default TeacherManage;
