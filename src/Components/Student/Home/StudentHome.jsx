import CourseSection from "../Course/CourseSection";
import ClassSection from "./ClassSection";
import TodaySchedules from "./TodaySchedules";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClasses,
  resetClassState,
} from "../../../Redux/Features/Student/ClassSlice";
import {
  checkIfStudentHasEnrolled,
  resetEnrollmentState,
} from "../../../Redux/Features/Student/EnrolledClassSlice";
import SubjectView from "../Subjects/SubjectView";

const StudentHome = () => {
  const classes = useSelector((state) => state.classData.classList);
  const StudentData = useSelector((state) => state.studentData.studentData);
  const [hasPaid, setHasPaid] = useState(true);
  const studentId = StudentData._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfStudentHasEnrolled(studentId))
      .unwrap()
      .then((data) => {
        if (data.success) {
          setHasPaid(true);
          dispatch(resetClassState());
        } else {
          setHasPaid(false);
          dispatch(getClasses());
          dispatch(resetEnrollmentState());
        }
      })
      .catch((error) => {
        console.error("Error checking enrollment:", error);
        // Handle error appropriately
      });
  }, [dispatch, studentId, hasPaid]);

  return (
    <div className="mt-24 p-4">
      <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
        <div className="w-full md:w-1/2 bg-blue-100 rounded-xl p-4 max-w-full overflow-auto">
          {hasPaid ? (
            <div className="overflow-y-auto">
              <SubjectView />
            </div>
          ) : (
            <>
              <p className="text-xl font-bold mb-3 p-2">Select Class</p>
              <ClassSection
                studentData={StudentData._id}
                classData={classes}
                onPaymentSuccess={setHasPaid}
              />
            </>
          )}
        </div>
        <div className="w-full md:w-1/2 rounded-xl max-w-full">
          <div className=" bg-green-100 rounded-xl p-4 mb-2">
            <TodaySchedules />
          </div>
          <div className=" bg-green-100 rounded-xl p-4 ">
            <CourseSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
