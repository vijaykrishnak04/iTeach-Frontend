import { useState, useEffect } from "react";
import AddLessonModal from "./AddLessonModal";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, message } from "antd";
import { editChapter } from "../../../Redux/Features/Teacher/ClassSlice";

const EditChapter = () => {
  const [chapterTitle, setChapterTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLessonIndex, setEditLessonIndex] = useState(null);

  const location = useLocation();
  const { classId, subject, chapter } = location.state || {};
  const subjectId = subject._id;
  const chapterId = chapter._id

  useEffect(() => {
    if (chapter) {
      setChapterTitle(chapter.chapterTitle);
      setLessons(chapter.lessons || []);
    }
  }, [chapter]);

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

    if (!chapterTitle) {
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
      chapterId,
      updatedChapter: {
        chapterTitle,
        lessons,
      },
    };

    Modal.confirm({
      title: "Do you want to update this chapter with its lessons?",
      content: "Please confirm to update.",
      async onOk() {
        try {
          const resultAction = await dispatch(editChapter(chapterData));
          if (editChapter.fulfilled.match(resultAction)) {
            if (!resultAction.payload.error) {
              navigate(`/teacher/class/${classId}`);
              message.success("Updated Chapter and Lessons successfully");
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
      className="w-full p-4 mt-20"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Edit Chapter for {subject?.subjectName}
      </h2>

      <div className="flex justify-between items-center mb-5">
        <div className="w-1/3">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Chapter Title:
          </label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            placeholder="Enter chapter title..."
          />
          {errors.chapterTitle && (
            <p className="text-red-500">{errors.chapterTitle}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500"
        >
          Submit Chapter
        </button>
      </div>

      <div className="bg-gray-300 p-6 shadow-md rounded-md">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold">Manage Lessons</h3>

          <button
            type="button"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-800"
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
                <h3 className="text-lg font-semibold">{lesson.lessonTitle}</h3>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => editLesson(index)}
                    className="text-sm bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeLesson(index)}
                    className="text-sm bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-500"
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

      {/* Submit Chapter Button outside of rounded div */}

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

export default EditChapter;
