import { useState, useEffect, useRef } from "react";
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
import {
  editStudent,
  getStudentById,
} from "../../../Redux/Features/Student/AuthSlice";
import ClassSection from "../Home/ClassSection";
import ExamResult from "./ExamResult";

const StudentProfile = () => {
  const studentData = useSelector((state) => state.studentData.studentData);
  const classes = useSelector((state) => state.classData.classList);

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
      photo: studentData?.studentImage?.url,
      phoneNumber: studentData.phoneNumber,
      classRef: studentData.classRef,
      gender: studentData.gender,
      dateOfBirth: formattedDate,
      address: studentData.address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData]);

  const studentId = studentData._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentById(studentId));
  }, [dispatch, studentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Modal.confirm({
      title: "Are you sure you want to update the details?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Confirming will update the student details with the provided data.",
      async onOk() {
        try {
          // Dispatch the editStudent asyncThunk
          const actionResult = await dispatch(
            editStudent({ studentId, studentData: student })
          );

          // Check if the action was fulfilled
          if (editStudent.fulfilled.match(actionResult)) {
            setEditing(false);
            message.success("Details updated successfully!");
          } else {
            message.error(
              actionResult.payload ||
                "Error updating details. Please try again."
            );
          }
        } catch (error) {
          console.error("Error updating student details:", error);
          message.error("Error updating details. Please try again.");
        }
      },
      onCancel() {
        // Optional: Handle any action if the user cancels
        return;
      },
    });
  };

  const fileInput = useRef(null);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append("photo", file);

      try {
        const headers = {
          Authorization: localStorage.getItem("studentToken"),
          // Since we're using FormData, you might not need to explicitly set the Content-Type header
          // but I'll leave it here in case you need it.
          "Content-Type": "multipart/form-data",
        };

        // Dispatch the editStudent asyncThunk
        // Assuming studentId and student are accessible in the scope
        await dispatch(
          editStudent({
            studentId,
            studentData: formData,
            headers,
          })
        );

        // If you need any post-success actions like updating local state or UI, add them here
        message.success("Photo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading photo:", error);
        message.error("Error uploading photo. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 mt-20 flex sm:flex-row flex-col items-start">
      {/* First Column - Profile picture and selecting class */}
      <div className="md:w-1/2 md:mr-8 mb-8 md:mb-0">
        <div className="text-center">
          <input
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInput}
          />
          {student.photo ? (
            <div className="relative">
              <img
                src={student.photo}
                alt="Student"
                className="mx-auto rounded-full w-32 h-32"
              />
              <button
                onClick={() => fileInput.current.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-md p-1"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="mx-auto w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <button
                onClick={() => fileInput.current.click()}
                className="text-center"
              >
                <FontAwesomeIcon icon={faCamera} className="text-gray-500" />
                <span className="block text-gray-500">Add Photo</span>
              </button>
            </div>
          )}

          <h2 className="mt-4 text-xl">{student.name}</h2>

          <div className="mt-4 flex flex-col">
            <p className="text-xl text-start font-bold mb-3 p-2">
              Change Class
            </p>
            <ClassSection studentData={studentId} classData={classes} />
          </div>
          <div className="mt-4 flex flex-col items-start p-4 bg-gray-100 rounded-md shadow-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
            <ExamResult exam={studentData.exam} />
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
