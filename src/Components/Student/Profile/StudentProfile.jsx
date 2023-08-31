import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faCheck,
  faKey,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getStudentById } from "../../../Redux/Features/Student/AuthSlice";
import { editStudentApi } from "../../../Services/Student";

const StudentProfile = () => {
  const studentData = useSelector((state) => state.studentData.studentData);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(studentData.dateOfBirth);

  const initialStudentState = {
    photo: studentData?.studentImage?.url || null,
    name: studentData.fullName,
    email: studentData.email,
    phoneNumber: studentData.phoneNumber,
    classRef: studentData.classRef,
    gender: studentData.gender || "", // You can set default values if needed.
    dateOfBirth: formattedDate || "",
    address: studentData.address || "",
  };

  const [student, setStudent] = useState(initialStudentState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setStudent({
      ...student,
      name: studentData.fullName,
      email: studentData.email,
      phoneNumber: studentData.phoneNumber,
      classRef: studentData.classRef,
      gender: studentData.gender,
      dateOfBirth: formattedDate,
      address: studentData.address,
    });
  }, [studentData]);

  const studentId = studentData._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentById(studentId));
  }, [dispatch, studentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: localStorage.getItem("studentToken"),
    };

    Modal.confirm({
      title: "Are you sure you want to update the details?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Confirming will update the student details with the provided data.",
      async onOk() {
        try {
          const response = await editStudentApi(studentId, student, headers);
          if (response.status === 200) {
            setEditing(false);
            dispatch(getStudentById(studentId)); // To refresh the data on UI
            message.success("Details updated successfully!");
          } else {
            message.error("Error updating details. Please try again.");
          }
        } catch (error) {
          console.error("Error updating student details:", error);
        }
      },
      onCancel() {
        // Optional: Handle any action if the user cancels
        console.log("User cancelled the update");
      },
    });
  };

  return (
    <div className="p-4 md:p-8 mt-20 flex sm:flex-row flex-col">
      {/* First Column - Profile picture and selecting class */}
      <div className="md:w-1/2 md:mr-8 mb-8 md:mb-0">
        <div className="text-center">
          {student.photo ? (
            <img
              src={student.photo}
              alt="Student"
              className="mx-auto rounded-full w-32 h-32"
            />
          ) : (
            <div className="mx-auto w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCamera} className="text-gray-500" />
            </div>
          )}
          <h2 className="mt-4 text-xl">{student.name}</h2>

          <div className="mt-4 flex justify-center items-center">
            <select className="mr-2 p-2">
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
            </select>
            <button className="p-2 bg-red-600 text-white rounded">
              Change Class
            </button>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 bg-yellow-200 rounded-lg p-8 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name:
          </label>
          <input
            id="name"
            type="text"
            required
            value={student.name}
            className={`border p-2 w-full mb-3 ${
              !editing ? "bg-gray-100" : ""
            }`}
            readOnly={!editing}
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {/* Email */}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            required
            value={student.email}
            className={`border p-2 w-full mb-3 ${
              !editing ? "bg-gray-100" : ""
            }`}
            readOnly={!editing}
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {/* Phone Number */}
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            type="tel"
            required
            value={student.phoneNumber}
            className={`border p-2 w-full mb-3 ${
              !editing ? "bg-gray-100" : ""
            }`}
            readOnly={!editing}
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
          />

          {/* Gender */}
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender:
          </label>
          <select
            id="gender"
            value={student.gender}
            className={`border p-2 w-full mb-3 ${
              !editing ? "bg-gray-100" : ""
            }`}
            disabled={!editing}
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Date of Birth */}
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth:
          </label>
          <input
            id="dob"
            type="date"
            required
            value={student.dateOfBirth}
            className={`border p-2 w-full mb-3 ${
              !editing ? "bg-gray-100" : ""
            }`}
            readOnly={!editing}
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, dateOfBirth: e.target.value }))
            }
          />

          {/* Address */}
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address:
          </label>
          <textarea
            id="address"
            required
            value={student.address}
            className={`border p-2 w-full h-20 mb-2 ${
              !editing ? "bg-gray-100" : ""
            }`}
            readOnly={!editing}
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, address: e.target.value }))
            }
          />

          {/* Actions */}
          <div className="mt-2">
            {/* Toggle Editing Button (Visible when not in editing mode) */}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="mr-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Details
              </button>
            )}

            {/* Submit (Done) and Cancel Buttons (Visible when in editing mode) */}
            {editing && (
              <>
                <button
                  type="submit"
                  className="p-2 mr-4 bg-green-600 text-white rounded hover:bg-green-700 shadow-md"
                >
                  <FontAwesomeIcon icon={faCheck} /> Done
                </button>

                {/* Cancel Button */}
                <button
                  onClick={() => setEditing(false)}
                  className="p-2 mr-4 bg-red-600 text-white rounded hover:bg-red-700 shadow-md"
                >
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
              </>
            )}

            <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-md">
              <FontAwesomeIcon icon={faKey} /> Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
