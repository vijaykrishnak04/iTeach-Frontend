/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../Redux/Features/Student/CoursesSlice";

const CourseSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const coursesData = useSelector((state) => state.courseData.courseList);
  const filteredCourses = coursesData
    ? coursesData.filter((course) => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Explore new courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 w-full border rounded transform transition-transform duration-300 hover:scale-105"
      />
      {/* <div className="flex flex-wrap justify-center">
        {filteredCourses.map((course) => (
          <Link to={`/student/course/${course._id}`} key={course._id}>
          <div
            key={course._id}
            className="m-4 transition-transform transform hover:text-orange-600 scale-100 hover:scale-105"
          >
            <div className="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
              <img
                className="w-full h-48"
                src={course.thumbnail.url}
                alt={course.title}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {course.title}
                </h2>
                <p className="mt-2 text-gray-600">{course.description}</p>
              </div>
            </div>
          </div>
          </Link>
        ))}
       
      </div> */}
      <div className="flex flex-col gap-4">
        {filteredCourses.map((course) => (
          <Link to={`/student/course/${course._id}`} key={course._id}>
            <div className="flex space-x-4 rounded overflow-hidden shadow-lg p-4 bg-white transform transition-transform duration-300 hover:scale-105">
              <img
                className="w-24 h-24 object-cover"
                src={course.thumbnail.url}
                alt={course.title}
              />
              <div className="flex flex-col justify-center">
                <div className="font-medium text-md sm:text-lg truncate">
                  {course.title}
                </div>
                <div className="text-xs overflow-auto">
                  {course.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CourseSection;
