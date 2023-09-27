import SchedulesSection from "./SchedulesSection";
import ClassesSection from "./ClassesSection";
import { getClasses } from "../../../Redux/Features/Teacher/classSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const TeacherHome = () => {
  const dispatch = useDispatch();

  // Assuming that the classes data is stored in the state at the given path
  const classesData = useSelector((state) => state.classData.classList);
  // Fetch the classes data when the component is mounted
  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div className="mt-10">
      <SchedulesSection />
      <ClassesSection classes={classesData} /> {/* Pass the classes data to the ClassesSection component */}
    </div>
  );
};

export default TeacherHome;
