import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { teacherEditProfile } from "../../../Redux/Features/Teacher/TeacherProfileSlice";
import ChangePasswordModal from "./ChangePasswordModal";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const teacherData = useSelector(
    (state) => state.teacherProfileData?.teacherProfileData
  );

  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(
    teacherData?.teacherImage?.url || null
  );
  const [image, setImage] = useState(null);
  const [name, setName] = useState(teacherData?.fullName || "");
  const [email, setEmail] = useState(teacherData?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };
  const saveChanges = async () => {
    setIsLoading(true);

    // Use FormData to build the payload
    const formData = new FormData();
    formData.append("_id", teacherData._id);
    formData.append("fullName", name);
    formData.append("email", email);
    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(teacherEditProfile(formData));
      setIsEditing(false);
    } catch (error) {
      // Handle error - display a message or other appropriate action
    }
    setIsLoading(false);
  };

  const cancelChanges = () => {
    setName(teacherData?.fullName || "");
    setProfilePic(teacherData?.teacherImage?.url || null);
    setEmail(teacherData?.email || "");
    setImage(null);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <img
          className="w-32 h-32 object-cover rounded-full shadow-lg"
          src={profilePic}
          alt="Profile"
        />

        <input
          type="file"
          className="text-sm text-gray-600 p-1 border rounded-md"
          accept=".jpeg, .jpg, .png"
          onChange={onImageChange}
          disabled={!isEditing}
        />

        <input
          type="text"
          placeholder="fullname"
          className={`w-full p-2 border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${
            !isEditing ? "bg-gray-200" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />

        <input
          type="text"
          placeholder="email"
          className="w-full p-2 border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />

        {isEditing ? (
          <div className="flex space-x-4">
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faCheck} />
              )}{" "}
              Done
            </button>
            <button
              onClick={cancelChanges}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        )}

        <button
          onClick={() => setIsModalVisible(true)}
          className="bg-yellow-500 text-white px-6 py-2 mt-4 rounded-full hover:bg-yellow-600 transition"
        >
          Change Password
        </button>
      </div>
      <ChangePasswordModal
        id={teacherData._id}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default TeacherProfile;
