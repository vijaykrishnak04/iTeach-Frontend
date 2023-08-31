import CourseSection from "../../Components/Student/Course/CourseSection";
import StudentNavBar from "../../Components/Student/Home/StudentNavbar";

const CourseSectionPage = () => {
  return (
    <>
      <StudentNavBar />
      <div className="mt-24 p-4 mx-5 rounded-lg bg-blue-100">
        <CourseSection />
      </div>
    </>
  );
};

export default CourseSectionPage;
