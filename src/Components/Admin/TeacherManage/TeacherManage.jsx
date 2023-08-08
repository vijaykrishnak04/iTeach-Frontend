/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { message } from "antd";
import {
  addTeacher,
  getTeachers,
  deleteTeacher,
  blockTeacher,
  unblockTeacher,
} from "../../../Redux/Features/Admin/getTeachersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import AddTeacherModal from "./AddTeacherModal";

const TeacherManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teacherData.teacherList);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const subjects = ["Math", "Science", "English"];

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };
    dispatch(getTeachers(headers));
  }, [dispatch]);

  const handleAddTeacher = async (teacher) => {
    try {
      const resultAction = await dispatch(addTeacher({ teacher }));
      if (addTeacher.fulfilled.match(resultAction)) {
        if (!resultAction.payload.error) {
          message.success("Added Teacher successfully");
        } else {
          console.log(resultAction.payload.message);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleBlockTeacher = async (teacherId) => {
    try {
      const resultAction = await dispatch(blockTeacher(teacherId));
      if (blockTeacher.fulfilled.match(resultAction)) {
        if (!resultAction.payload.error) {
          message.success("Teacher blocked successfully");
        } else {
          console.error(resultAction.payload.message);
          toast.error(resultAction.payload.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleUnblockTeacher = async (teacherId) => {
    try {
      const resultAction = await dispatch(unblockTeacher(teacherId));
      if (unblockTeacher.fulfilled.match(resultAction)) {
        if (!resultAction.payload.error) {
          message.success("Teacher unblocked successfully");
        } else {
          console.error(resultAction.payload.message);
          toast.error(resultAction.payload.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    try {
      const resultAction = await dispatch(deleteTeacher(teacherId));
      if (deleteTeacher.fulfilled.match(resultAction)) {
        if (!resultAction.payload.error) {
          message.success("Teacher removed successfully");
        } else {
          console.error(resultAction.payload.message);
          toast.error(resultAction.payload.message);
        }
      }
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
