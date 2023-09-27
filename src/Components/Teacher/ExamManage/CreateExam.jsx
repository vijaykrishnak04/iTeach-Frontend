import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AddQuestionModal from "./AddQuestionModal";
import { Modal, message } from "antd";
import { createExam } from "../../../Redux/Features/Teacher/ExamSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const classesData = useSelector((state) => state.classData.classList);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedClassAndSubject, setSelectedClassAndSubject] = useState({
    classId: "",
    className: "",
    subjectId: "",
    subjectName: "",
  });
  console.log(selectedClassAndSubject);
  const [questionToEdit, setQuestionToEdit] = useState(null);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Exam title is required.";
    if (!duration.trim()) newErrors.duration = "Duration is required.";
    if (!date.trim()) newErrors.date = "Exam date & time is required.";
    if (!selectedClassAndSubject?.className)
      newErrors.selectedClass = "Selecting a class is required.";
    if (!selectedClassAndSubject?.subjectName)
      newErrors.subject = "Selecting a subject is required.";
    if (questions.length === 0)
      newErrors.questions = "At least one question is required.";

    setErrors(newErrors);

    // If the newErrors object is empty, return true (valid form), else return false.
    return Object.keys(newErrors).length === 0;
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // pad with '0' to get 2 digits
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Sample function to add questions, you can expand upon this
  const addQuestion = (newQuestion) => {
    if (questionToEdit !== null) {
      questions[questionToEdit] = newQuestion;
      setQuestionToEdit(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }
  };

  const handleClassChange = (e) => {
    const selectedId = e.target.value;
    const selectedClassObj = classesData.find((cls) => cls._id === selectedId);

    setSelectedClassAndSubject({
      classId: selectedId,
      className: selectedClassObj.name,
      subjectId: "",
      subjectName: "",
    });
  };

  const handleSubjectChange = (e) => {
    const selectedId = e.target.value;
    const selectedClassObj = classesData.find(
      (cls) => cls._id === selectedClassAndSubject.classId
    );

    // Return early if the class or its subjects are not found
    if (!selectedClassObj || !selectedClassObj.subjects) return;

    const selectedSubjectObj = selectedClassObj.subjects.find(
      (sub) => sub._id === selectedId
    );

    console.log(selectedSubjectObj);

    // It's good practice to check for the existence of the selected subject as well
    if (!selectedSubjectObj) return;

    setSelectedClassAndSubject((prevState) => ({
      ...prevState,
      subjectId: selectedId,
      subjectName: selectedSubjectObj.subjectName,
    }));
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const handleEditQuestion = (indexToEdit) => {
    // Step 1: Set the question to be edited
    setQuestionToEdit(indexToEdit);
    setShowModal(true); // Show the modal for editing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const exam = {
      title,
      duration,
      date,
      selectedClassAndSubject,
      questions,
    };
    Modal.confirm({
      title: "Do you want to create exam?",
      content: "Please confirm to create.",
      async onOk() {
        try {
          const resultAction = await dispatch(createExam(exam));
          if (createExam.fulfilled.match(resultAction)) {
            if (!resultAction.payload.error) {
              navigate(`/teacher/exams`);
              message.success("Created exam successfully");
            } else {
              console.error(resultAction.payload.message);
            }
          }
        } catch (err) {
          console.error(err);
        }
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5 mt-20">
      <p className="text-3xl font-bold text-gray-800 mb-6">Create Exam</p>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-md shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Class for Exam
          </label>
          <select
            className={`border ${
              errors.title ? "border-red-500 mb-2" : "mb-4 "
            } p-2 w-full rounded-md`}
            value={selectedClassAndSubject.classId}
            onChange={handleClassChange}
          >
            <option value=""></option>
            {classesData.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Subject for Exam
          </label>
          <select
            className={`border ${
              errors.subject ? "border-red-500 mb-2" : "mb-4 "
            } p-2 w-full rounded-md`}
            value={selectedClassAndSubject.subjectId}
            onChange={handleSubjectChange}
          >
            <option value=""></option>
            {selectedClassAndSubject && selectedClassAndSubject.classId
              ? classesData
                  .find((cls) => cls._id === selectedClassAndSubject.classId)
                  .subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.subjectName}
                    </option>
                  ))
              : null}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Title
          </label>
          <input
            value={title}
            type="text"
            className={`border ${
              errors.title ? "border-red-500 mb-2" : "mb-4 "
            } p-2 w-full rounded-md`}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mb-3">{errors.title}</p>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (minutes)
          </label>
          <input
            value={duration}
            type="number"
            className={`border ${
              errors.duration ? "border-red-500 mb-2" : "mb-4 "
            } p-2 w-full rounded-md`}
            onChange={(e) => setDuration(e.target.value)}
          />
          {errors.duration && (
            <p className="text-red-500 text-xs mb-3">{errors.duration}</p>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exam Date & Time
          </label>
          <input
            value={date}
            type="datetime-local"
            min={getMinDateTime()}
            className={`border ${
              errors.date ? "border-red-500 mb-2" : "mb-4 "
            } p-2 w-full rounded-md`}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mb-3">{errors.date}</p>
          )}

          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4 transition duration-300"
          >
            Add Question
          </button>

          <div className="">
            {questions.map((question, index) => (
              <div key={index} className="border p-4 mb-4 rounded-md">
                <p>{question.text}</p> {/* Display the question here */}
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => handleEditQuestion(index)}
                  className="text-yellow-500 hover:text-yellow-700 ml-2 transition duration-300"
                >
                  Edit
                </button>
              </div>
            ))}
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4 transition duration-300"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </form>

      <AddQuestionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setQuestionToEdit(null);
        }}
        saveQuestion={addQuestion}
        editQuestionIndex={questionToEdit}
        questionToEdit={
          questionToEdit !== null ? questions[questionToEdit] : null
        }
      />
    </div>
  );
};

export default CreateExam;
