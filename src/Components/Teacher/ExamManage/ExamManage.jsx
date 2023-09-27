import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cancelExam,
  getExams,
} from "../../../Redux/Features/Teacher/ExamSlice";
import { Modal, message } from "antd";
import { toast } from "react-toastify";

const ExamManage = () => {
  const examData = useSelector((state) => state.examData.examList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  const currentDate = new Date();

  const [filterDate, setFilterDate] = useState(""); // State to hold the filter date value
  const [selectedClass, setSelectedClass] = useState("");

  const allClasses = [...new Set(examData.map((exam) => exam.class.className))];

  const filteredExams = examData.filter(
    (exam) =>
      !filterDate ||
      new Date(exam.date).toDateString() === new Date(filterDate).toDateString()
  );

  const upcomingExams = filteredExams.filter(
    (exam) => new Date(exam.date) > currentDate
  );

  const pastExams = filteredExams.filter(
    (exam) => new Date(exam.date) <= currentDate
  );

  const handleExamCancel = (examId) => {
    Modal.confirm({
      title: "Do you want to cancel this exam?",
      content: "Once Cancel, this exam will no longer be publicly available.",
      async onOk() {
        try {
          const resultAction = await dispatch(cancelExam(examId));
          if (cancelExam.fulfilled.match(resultAction)) {
            if (!resultAction.payload.error) {
              message.success("Exam Cancelled successfully");
            } else {
              console.error(resultAction.payload.message);
              toast.error(resultAction.payload.message);
            }
          }
        } catch (err) {
          console.error(err);
          toast.error("An unexpected error occurred");
        }
      },
      onCancel() {
        return;
      },
    });
  };

  const renderExamCard = (exam, isUpcoming) => (
    <div
      key={exam._id}
      className="bg-white shadow-md rounded-lg p-3 text-sm mb-5 border-l-8 border-blue-500 transition-transform transform hover:scale-105 flex flex-col"
    >
      <h3 className="text-xl font-bold mb-2">{exam.title}</h3>{" "}
      <div className="flex justify-between items-start flex-grow">
        <div>
          <p className="m-2">Class: {exam.class.className}</p>
          <p className="m-2">Subject: {exam.class.subjectName}</p>
          <p className="m-2">
            Date: {new Date(exam.date).toLocaleDateString()}{" "}
            {new Date(exam.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="m-2">Duration: {exam.duration} mins</p>
          <p className="m-2">Questions: {exam.questions.length}</p>
        </div>
        {isUpcoming && (
          <div className="mt-auto flex justify-end ">
            <button
              onClick={() => handleExamCancel(exam._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-3"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-5 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Exams</h1>
          <p className="text-xl text-gray-600">Manage exams</p>
        </div>
        <Link
          to="/teacher/exams/create-exams"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-lg"
        >
          Create Exam
        </Link>
      </div>

      {/* Date Filter Input */}
      <div className="mb-5 relative flex px-10 justify-between bg-white py-3 rounded-lg shadow-md">
        <div className="flex items-center">
          <label
            htmlFor="dateFilter"
            className="text-lg font-medium text-gray-700 mr-3"
          >
            Filter by Date:
          </label>
          <div className="">
            <input
              id="dateFilter"
              type="date"
              className="pl-5 pr-5 py-2 border rounded text-gray-700 "
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            {filterDate && (
              <button
                className="bg-red-500 mx-3 text-white font-semibold hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md rounded-lg px-4 py-2"
                onClick={() => setFilterDate("")}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="classDropdown"
            className="text-lg font-medium text-gray-700 mr-3"
          >
            Filter by Class:
          </label>
          <select
            id="classDropdown"
            className="pl-5 pr-5 py-2 border rounded text-gray-700"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {allClasses.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Upcoming</h2>
          <div className="grid grid-cols-2 gap-4">
            {upcomingExams.map((exam) => renderExamCard(exam, true))}
          </div>
        </div>

        <div className="p-5 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Past</h2>
          <div className="grid grid-cols-2 gap-4">
            {pastExams.map((exam) => renderExamCard(exam, false))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamManage;
