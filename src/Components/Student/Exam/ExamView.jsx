import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamsByIds } from "../../../Redux/Features/Student/ExamSlice";
import { Modal, Button } from "antd";
import AttendExamModal from "./AttendExamModal";
import { resetExamState } from "../../../Redux/Features/Student/ExamSlice";
const ExamView = () => {
  const examIds = useSelector(
    (state) => state.enrollmentData?.enrolledClass?.exams
  );
  const examData = useSelector((state) => state.studentExamData.examList);
  const attendedExam = useSelector(
    (state) => state.studentData.studentData?.exam
  );


  const isExamAttended = (examId, attendedExams) => {
    if(!attendedExam) return
    return attendedExams.some((attendedExam) => attendedExam._id === examId);
  };

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [currentExamQuestions, setCurrentExamQuestions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (examIds.length !== 0 && examIds) {
      dispatch(getExamsByIds(examIds));
    }
  }, [dispatch, examIds]);

  if (!examIds) {
    dispatch(resetExamState());
  }

  const showConfirmationModal = (exam) => {
    setCurrentExamQuestions(exam);
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmationOk = () => {
    setIsConfirmationModalVisible(false);
    setIsExamModalVisible(true); // open the exam modal right after confirmation
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationModalVisible(false);
  };

  const handleExamModalClose = () => {
    setIsExamModalVisible(false);
    setCurrentExamQuestions([]);
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours to zero for currentDate

  const [filterDate, setFilterDate] = useState("");

  const filteredExams = examData.filter(
    (exam) =>
      !filterDate ||
      new Date(exam.date).toDateString() === new Date(filterDate).toDateString()
  );

  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // This is already set to zero

  const upcomingExams = filteredExams.filter((exam) => {
    let examDate = new Date(exam.date);
    examDate.setHours(0, 0, 0, 0); // Set hours to zero for examDate
    return examDate >= tomorrow;
  });

  const currentExams = filteredExams.filter((exam) => {
    let examDate = new Date(exam.date);
    examDate.setHours(0, 0, 0, 0); // Set hours to zero for examDate
    return examDate.toDateString() === currentDate.toDateString();
  });

  const pastExams = filteredExams.filter((exam) => {
    let examDate = new Date(exam.date);
    examDate.setHours(0, 0, 0, 0); // Set hours to zero for examDate
    return examDate < currentDate;
  });

  const renderExamCard = (exam, type) => (
    <div
      key={exam._id}
      className="bg-white shadow-md text-sm rounded-lg p-3 mb-5 border-l-8 border-blue-500 transition-transform transform hover:scale-105 flex flex-col"
    >
      <h3 className="text-xl font-bold mb-2">{exam.title}</h3>{" "}
      {/* Moved this h3 outside of the inner div */}
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
        {isExamAttended(exam._id, attendedExam) ? (
          <div className="mt-auto flex justify-end">
            <span className="text-lg mb-2 mr-2 text-white px-3 py-1 rounded bg-red-500">
              Attended
            </span>
          </div>
        ) : type === "current" ? (
          <div className="mt-auto flex justify-end">
            <button
              onClick={() => showConfirmationModal(exam)}
              className="bg-green-500 hover:bg-green-600 text-lg mb-2 mr-2 text-white px-3 py-1 rounded"
            >
              Start
            </button>
          </div>
        ) : null}
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
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Past</h2>
          <div className="grid grid-cols-1 gap-4">
            {pastExams.map((exam) => renderExamCard(exam, false))}
          </div>
        </div>

        <div className="p-5 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Current</h2>
          <div className="grid grid-cols-1 gap-4">
            {currentExams.map((exam) => renderExamCard(exam, "current"))}
          </div>
        </div>

        <div className="p-5 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Upcoming</h2>
          <div className="grid grid-cols-1 gap-4">
            {upcomingExams.map((exam) => renderExamCard(exam, true))}
          </div>
        </div>
      </div>

      <Modal
        title="Start Exam?"
        open={isConfirmationModalVisible}
        onCancel={handleConfirmationCancel}
        footer={[
          <Button
            key="cancel"
            className="text-black hover:text-blue-400 border-gray-100 hover:border-blue-400 hover:bg-white "
            type="primary"
            onClick={handleConfirmationCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="bg-blue-500"
            type="primary"
            onClick={handleConfirmationOk}
          >
            OK
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to start this exam? once the exam started you
          can`t goback.
        </p>
      </Modal>

      <AttendExamModal
        isVisible={isExamModalVisible}
        examData={currentExamQuestions}
        onClose={handleExamModalClose}
      />
    </div>
  );
};

export default ExamView;
