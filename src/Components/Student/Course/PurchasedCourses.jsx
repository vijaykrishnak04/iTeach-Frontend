import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../Redux/Features/Student/CoursesSlice";
import { SimplePagination } from "./SimplePagination";

const PurchasedCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4); // 4 because we want to show 2 cards in a row, and 2 rows in total
  const studentId = useSelector((state) => state.studentData.studentData._id);
  const coursesData = useSelector((state) => state.courseData.courseList);
  const filteredCourses = coursesData
    ? coursesData.filter((course) => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses(studentId));
  }, [dispatch, studentId]);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Purchased courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 w-full border rounded transform transition-transform duration-300 hover:scale-105"
      />

      <div className="grid grid-cols-2 gap-4">
        {currentCourses.map((course) => (
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

      <div className="flex items-center justify-center text-center mt-4">
        <SimplePagination
          active={currentPage}
          setActive={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default PurchasedCourses;
