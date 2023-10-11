import { useEffect, useState } from "react";
import { getCoursesApi } from "../../Services/LandingService";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, SetCourses] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getCoursesApi().then((response) => SetCourses(response.data));
  }, []);

  return (
    <div className="flex flex-col items-center py-16 px-4 space-y-6 bg-orange-100">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-orange-600">Our Courses</h1>
      <p>Learn for free with Live Classes and Pre Recorded Videos</p>

      {/* Courses Display */}
      <div className="flex flex-wrap justify-center">
        {courses.map((course) => (
          <div
            key={course._id}
            className="m-4 transition-transform transform hover:text-orange-600 scale-100 hover:scale-105"
            onClick={()=> navigate("/login") }
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
        ))}
      </div>

      {/* View All Courses Button */}
      <button className="px-6 py-3 text-white transition-colors bg-orange-600 rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
        View All Courses
      </button>
    </div>
  );
};

export default Courses;
