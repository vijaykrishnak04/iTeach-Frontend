import { useState } from "react";
import validator from "validator";
import AddLessonModal from "./AddLessonModal";
import { addCourse } from "../../../Redux/Features/Admin/ManageCoursesSlice";
import { toast } from "react-toastify";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [editLessonIndex, setEditLessonIndex] = useState(null);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setThumbnail(fileURL);
      setThumbnailFile(file); // store the file object
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (validator.isEmpty(courseTitle)) {
      newErrors.courseTitle = "Course title is required!";
    }

    if (validator.isEmpty(coursePrice)) {
      newErrors.coursePrice = "Course price is required!";
    }

    if (validator.isEmpty(courseDescription)) {
      newErrors.courseDescription = "Course description is required!";
    }

    if (!thumbnail) {
      newErrors.thumbnail = "Thumbnail is required!";
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

    const courseData = {
      courseTitle,
      courseDescription,
      coursePrice,
      thumbnailFile,
      lessons,
    };

    Modal.confirm({
      title: "Do you want to add this course?",
      content: "Please confirm to add the course.",
      async onOk() {
        try {
          const resultAction = await dispatch(addCourse({ courseData }));
          if (addCourse.fulfilled.match(resultAction)) {
            if (!resultAction.payload.error) {
              navigate("/admin/courses");
              message.success("Added Course successfully");
            } else {
              console.log(resultAction.payload.message);
            }
          }
        } catch (err) {
          console.log(err);
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
        <h2 className="text-xl font-semibold text-center">Add a New Course</h2>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-green-600 shadow-sm hover:shadow-md text-white px-5 py-2 rounded hover:from-green-600 hover:to-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800 transition-all duration-500"
        >
          Submit Course
        </button>
      </div>
      <div className="flex flex-col p-6 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
        {/* First Row - Thumbnail, Course Title, and Course Description */}
        <div className="flex flex-wrap justify-between mb-6">
          {/* Thumbnail */}
          <div className="w-full md:w-1/3 p-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Thumbnail:
            </label>
            {thumbnail ? (
              <div className="flex flex-col items-center">
                <img
                  src={thumbnail}
                  alt="Course Thumbnail"
                  className="h-2/4 w-2/4 object-cover rounded-md mb-2 shadow hover:shadow-md transition-shadow duration-300"
                />
                <label className="text-blue-500 cursor-pointer hover:underline">
                  Change Thumbnail
                  <input
                    type="file"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    accept=".jpeg, .jpg, .png"
                  />
                </label>
              </div>
            ) : (
              <input
                type="file"
                onChange={handleThumbnailChange}
                className="p-2 border rounded w-full transition-border duration-300 hover:border-blue-500"
                accept=".jpeg, .jpg, .png"
              />
            )}
            {errors.thumbnail && (
              <p className="text-red-500">{errors.thumbnail}</p>
            )}
            <div className="my-5">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Course Price:
              </label>
              <input
                type="number"
                className="p-2 border rounded w-full transition-border duration-300 hover:border-blue-500"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="Enter course price..."
              />
              {errors.coursePrice && (
                <p className="text-red-500">{errors.coursePrice}</p>
              )}
            </div>
          </div>

          {/* Course Details */}
          <div className="w-full md:w-2/3 p-4">
            {/* Course Title */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Course Title:
              </label>
              <input
                type="text"
                className="p-2 border rounded w-full transition-border duration-300 hover:border-blue-500"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title..."
              />
              {errors.courseTitle && (
                <p className="text-red-500">{errors.courseTitle}</p>
              )}
            </div>

            {/* Course Description */}
            <div className="my-5">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Course Description:
              </label>
              <textarea
                className="p-2 border rounded w-full h-24 transition-border duration-300 hover:border-blue-500"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Enter course description..."
              ></textarea>
              {errors.courseDescription && (
                <p className="text-red-500">{errors.courseDescription}</p>
              )}
            </div>
          </div>
        </div>

        {/* Second Row - Add Lesson */}
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
          {errors.lessons && <p className="text-red-500 text-center">{errors.lessons}</p>}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
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
          setEditLessonIndex(null); // Resetting the state here
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

export default AddCourse;
