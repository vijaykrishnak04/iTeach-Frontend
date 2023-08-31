import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCourses,
  hideCourse,
  unHideCourse,
  deleteCourse,
} from "../../../Redux/Features/Admin/ManageCoursesSlice";
import {Modal, message } from "antd";
import { toast } from "react-toastify";

const CourseManage = () => {
  const courses = useSelector((state) => state.adminCourseData.courseList);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCourseButtonClick = () => {
    navigate("/admin/add-course");
  };

  const filteredCourses = Array.isArray(courses)
  ? courses.filter((course) => {
      return course.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
  : [];

  

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleEditCourse = (courseId) => {
    // Find the course from the courses array using the courseId
    const courseData = courses.find((course) => course._id === courseId);

    if (!courseData) {
      console.error(`No course found with id: ${courseId}`);
      return; // Exit the function if no course is found
    }

    console.log(`Editing course with id: ${courseId}`);

    // Navigate to EditCourse component and pass the course data
    navigate("/admin/edit-course", { state: { courseData } });
  };


const handleHideCourse = async (courseId) => {
  Modal.confirm({
    title: 'Do you want to hide this course?',
    content: 'Once hidden, this course will no longer be publicly available.',
    async onOk() {
      try {
        const resultAction = await dispatch(hideCourse(courseId));
        if (hideCourse.fulfilled.match(resultAction)) {
          if (!resultAction.payload.error) {
            message.success("Course hidden successfully");
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


const handleUnHideCourse = async (courseId) => {
  Modal.confirm({
    title: 'Do you want to unhide this course?',
    content: 'Once unhidden, this course will be publicly available again.',
    async onOk() {
      try {
        const resultAction = await dispatch(unHideCourse(courseId));
        if (unHideCourse.fulfilled.match(resultAction)) {
          if (!resultAction.payload.error) {
            message.success("Course unhidden successfully");
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

const handleRemoveCourse = async (courseId) => {
  Modal.confirm({
    title: 'Do you want to remove this course?',
    content: 'Once removed, this course will be permanently deleted.',
    async onOk() {
      try {
        const resultAction = await dispatch(deleteCourse(courseId));
        if (deleteCourse.fulfilled.match(resultAction)) {
          if (!resultAction.payload.error) {
            message.success("Course removed successfully");
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


  return (
    <div className="mt-10 p-10">
      <p className="text-lg font-bold mt-5">Course Management</p>
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={handleAddCourseButtonClick}
        >
          Add Course
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Lessons
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr
                key={course._id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={course.thumbnail.url}
                    alt={course.title}
                    width="75"
                    height="75"
                  />
                </td>
                <td className="px-6 py-4">{course.title}</td>
                <td className="px-6 py-4">{course.lessons.length}</td>
                <td className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleEditCourse(course._id)}
                    className="font-medium text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  {course.isHidden ? (
                    <button
                      onClick={() => handleUnHideCourse(course._id)}
                      className="font-medium hover:underline mr-3 text-gray-500"
                    >
                      Unhide
                    </button>
                  ) : (
                    <button
                      onClick={() => handleHideCourse(course._id)}
                      className="font-medium hover:underline mr-3 text-yellow-600"
                    >
                      Hide
                    </button>
                  )}

                  <button
                    onClick={() => handleRemoveCourse(course._id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManage;
