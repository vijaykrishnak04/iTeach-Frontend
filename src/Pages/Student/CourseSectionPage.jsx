import CourseSection from "../../Components/Student/Course/CourseSection";
import PurchasedCourses from "../../Components/Student/Course/PurchasedCourses";
import StudentNavBar from "../../Components/Student/Home/StudentNavbar";

const CourseSectionPage = () => {
  return (
    <>
      <StudentNavBar />
      <div className="mt-24 p-4 mx-5 rounded-lg bg-blue-100">
        <PurchasedCourses />
      </div>
      <div className="mt-5 p-4 mx-5 rounded-lg bg-green-100">
        <CourseSection />
      </div>
    </>
  );
};

export default CourseSectionPage;
