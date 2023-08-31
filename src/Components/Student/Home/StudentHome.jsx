import CourseSection from "../Course/CourseSection";
import ClassSection from "./ClassSection";
import BannerSection from "./BannerSection";
import InstructorsSection from "./InstructorsSection";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../Redux/Features/Student/CoursesSlice";
import { getClasses } from "../../../Redux/Features/Student/ClassSlice";
import { checkIfStudentHasEnrolled } from "../../../Redux/Features/Student/EnrolledClassSlice";
import SubjectView from "../Subjects/SubjectView";

const StudentHome = () => {
  const classes = useSelector((state) => state.classData.classList);
  const StudentData = useSelector((state) => state.studentData.studentData);
  const [hasPaid, setHasPaid] = useState(false);
  const studentId = StudentData._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());

    dispatch(checkIfStudentHasEnrolled(studentId))
      .unwrap()
      .then((data) => {
        if (data.success) {
          setHasPaid(true);
        } else {
          dispatch(getClasses());
        }
      })
      .catch((error) => {
        console.error("Error checking enrollment:", error);
        // Handle error appropriately
      });
  }, [dispatch, studentId]);

  return (
    <div className="mt-24 p-4">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/2 bg-blue-100 rounded-xl p-4 max-w-full overflow-auto">
          <BannerSection />
          <div className="mt-4 p-2 text-center">
            <div className="text-2xl text-start font-semibold mb-4">
              Welcome, {StudentData.fullName}!
            </div>
            <hr className="border-t border-gray-400 w-full" />
          </div>
          {hasPaid ? (
            <div className="overflow-y-auto">
              <SubjectView />
            </div>
          ) : (
            <>
              <p className="text-xl font-bold mb-3 p-2">Select Class</p>
              <ClassSection
                studentData={StudentData}
                classData={classes}
                onPaymentSuccess={setHasPaid}
              />
            </>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-green-100 rounded-xl p-4 max-w-full">
          <CourseSection />
          <InstructorsSection />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
