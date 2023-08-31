import { useState } from "react";
import validator from "validator";
import AddLessonModal from "./AddLessonModal";
import { addCourse } from "../../../Redux/Features/Admin/ManageCoursesSlice";
import { toast } from "react-toastify";
import {Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
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
      setThumbnailFile(file);  // store the file object
    }
  };
  

  const validateForm = () => {
    let newErrors = {};

    if (validator.isEmpty(courseTitle)) {
      newErrors.courseTitle = "Course title is required!";
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
      thumbnailFile,
      lessons,
    };
  
    Modal.confirm({
      title: 'Do you want to add this course?',
      content: 'Please confirm to add the course.',
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
  
    console.log(courseData);
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-24 p-6 bg-gray-300 shadow-md rounded-md"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-5 text-center">
        Add a New Course
      </h2>
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500 focus:outline-none focus:greeb-blue-700 focus:shadow-outline-blue active:bg-green-800"
        >
          Submit Course
        </button>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Thumbnail:
        </label>
        {thumbnail ? (
          <div className="flex flex-col items-center">
            <img
              src={thumbnail}
              alt="Course Thumbnail"
              className="h-2/4 w-2/4 object-cover rounded-md mb-2"
            />
            <label className="text-blue-500 cursor-pointer hover:underline">
              Change Thumbnail
              <input
                type="file"
                onChange={handleThumbnailChange}
                className="hidden" // This will hide the input, but it can still be triggered by clicking on the label
                accept=".jpeg, .jpg, .png"
              />
            </label>
          </div>
        ) : (
          <input
            type="file"
            onChange={handleThumbnailChange}
            className="p-2 border rounded w-full"
            accept=".jpeg, .jpg, .png"
          />
        )}
        {errors.thumbnail && <p className="text-red-500">{errors.thumbnail}</p>}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Course Title:
        </label>
        <input
          type="text"
          className="p-2 border rounded w-full"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course title..."
        />
        {errors.courseTitle && (
          <p className="text-red-500">{errors.courseTitle}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Course Description:
        </label>
        <textarea
          className="p-2 border rounded w-full h-24"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          placeholder="Enter course description..."
        ></textarea>
        {errors.courseDescription && (
          <p className="text-red-500">{errors.courseDescription}</p>
        )}
      </div>

      <div className="flex justify-center mt-6 mb-3">
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
          <div key={index} className="bg-white p-4 rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{lesson.lessonTitle}</h3>
              <div className="space-x-2">
                <button
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
            <p className="text-gray-600 text-sm">{lesson.lessonDescription}</p>
          </div>
        ))}
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
