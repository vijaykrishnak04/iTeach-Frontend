import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Student/HomePage";
import StudentVerification from "../Verification/StudentVerification";
import CourseViewPage from "../Pages/Student/CourseViewPage";
import ChapterViewPage from "../Pages/Student/ChapterViewPage";
import CourseSectionPage from "../Pages/Student/CourseSectionPage";
import StudentProfilePage from "../Pages/Student/StudentProfilePage";
import ExamViewPage from "../Pages/Student/ExamViewPage";
import ChatsViewPage from "../Pages/Student/ChatsViewPage";
import SchedulesViewPage from "../Pages/Student/SchedulesViewPage";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <StudentVerification>
            <HomePage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/course/:id"
        element={
          <StudentVerification>
            <CourseViewPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/class/subject"
        element={
          <StudentVerification>
            <ChapterViewPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/courses"
        element={
          <StudentVerification>
            <CourseSectionPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <StudentVerification>
            <StudentProfilePage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/exams"
        element={
          <StudentVerification>
            <ExamViewPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/chats"
        element={
          <StudentVerification>
            <ChatsViewPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/schedules"
        element={
          <StudentVerification>
            <SchedulesViewPage />
          </StudentVerification>
        }
      ></Route>
    </Routes>
  );
};

export default StudentRoutes;
