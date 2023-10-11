import { useState } from "react";
import AddLessonModal from "./AddLessonModal";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, message } from "antd";
// Remember to adjust the path for your slice.
import { addChapter } from "../../../Redux/Features/Teacher/classSlice";
import validator from "validator";

const AddChapter = () => {
  const [chapterTitle, setChapterTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLessonIndex, setEditLessonIndex] = useState(null);

  const location = useLocation();
  const { classId, subject } = location.state || {};
  const subjectId = subject._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const saveLesson = (lesson) => {
    if (editLessonIndex !== null) {
      const updatedLessons = [...lessons];
      updatedLessons[editLessonIndex] = lesson;
      setLessons(updatedLessons);
      setEditLessonIndex(null);
    } else {
      setLessons([...lessons, lesson]);
    }
  };

  const editLesson = (index) => {
    setEditLessonIndex(index);
    setIsModalOpen(true);
  };

  const removeLesson = (index) => {
    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);
  };

  const validateForm = () => {
    let newErrors = {};

    if (validator.isEmpty(chapterTitle.trim())) {
      newErrors.chapterTitle = "Chapter title is required!";
    } 

    if (lessons.length === 0) {
      newErrors.lessons = "At least one lesson is required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const chapterData = {
      classId,
      subjectId,
      chapter: {
        chapterTitle,
        lessons,
      },
    };

    Modal.confirm({
      title: "Do you want to add this chapter with its lessons?",
      content: "Please confirm to add.",
      async onOk() {
        try {
          const resultAction = await dispatch(addChapter(chapterData));
          if (addChapter.fulfilled.match(resultAction)) {
            if (!resultAction.payload.error) {
              navigate(`/teacher/class/${classId}`);
              message.success("Added Chapter and Lessons successfully");
            } else {
              console.error(resultAction.payload.message);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-5 mt-24 p-6 bg-gray-300 shadow-md rounded-md"
      encType="multipart/form-data"
    >
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-semibold">
          Add a New Chapter for {subject?.subjectName}
        </h2>
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-800 transition duration-300"
        >
          Submit Chapter
        </button>
      </div>

      <div className="flex flex-col p-6 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-wrap justify-between mb-6">
          <div className="w-full md:w-1/3 p-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Chapter Title:
            </label>
            <input
              type="text"
              className="p-2 border rounded w-full transition-border duration-300 hover:border-blue-500"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="Enter chapter title..."
            />
            {errors.chapterTitle && (
              <p className="text-red-500">{errors.chapterTitle}</p>
            )}
          </div>
        </div>

        <div className="w-full mt-3">
          <div className="flex justify-center mt-6 mb-3">
            <button
              type="button"
              className="bg-blue-600 text-white px-5 py-2 rounded transition-transform duration-300 transform hover:scale-105 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-800"
              onClick={() => setIsModalOpen(true)}
            >
              Add Lessons
            </button>
          </div>
          {errors.lessons && <p className="text-red-500">{errors.lessons}</p>}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {lesson.lessonTitle}
                  </h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => editLesson(index)}
                      className="text-sm bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-500 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeLesson(index)}
                      className="text-sm bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-500 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {lesson.lessonDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddLessonModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditLessonIndex(null);
        }}
        saveLesson={saveLesson}
        editLessonIndex={editLessonIndex}
        lessonToEdit={
          editLessonIndex !== null ? lessons[editLessonIndex] : null
        }
      />
    </form>
  );
};

export default AddChapter;
