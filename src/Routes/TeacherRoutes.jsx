import { Route, Routes } from "react-router-dom";
import TeacherHomePage from "../Pages/Teacher/TeacherHomePage";
import TeacherVerification from "../Verification/TeacherVerification";
import SubjectsViewPage from "../Pages/Teacher/SubjectsViewPage";
import AddChapterPage from "../Pages/Teacher/AddChapterPage";
import EditChapterPage from "../Pages/Teacher/EditChapterPage";
import ExamManagePage from "../Pages/Teacher/ExamManagePage";
import CreateExamPage from "../Pages/Teacher/CreateExamPage";
import StudentsManagePage from "../Pages/Teacher/StudentsManagePage";
import ChatsPage from "../Pages/Teacher/ChatsPage";
import TeacherProfilePage from "../Pages/Teacher/TeacherProfilePage";
import SchedulesPage from "../Pages/Teacher/SchedulesPage";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <TeacherVerification>
            <TeacherHomePage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/class/:id"
        element={
          <TeacherVerification>
            <SubjectsViewPage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/class/add-chapter"
        element={
          <TeacherVerification>
            <AddChapterPage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/class/edit-chapter"
        element={
          <TeacherVerification>
            <EditChapterPage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/exams"
        element={
          <TeacherVerification>
            <ExamManagePage />
          </TeacherVerification>
        }
      ></Route>
      \
      <Route
        path="/exams/create-exams"
        element={
          <TeacherVerification>
            <CreateExamPage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/class/students"
        element={
          <TeacherVerification>
            <StudentsManagePage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/chats"
        element={
          <TeacherVerification>
            <ChatsPage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <TeacherVerification>
            <TeacherProfilePage />
          </TeacherVerification>
        }
      ></Route>
      <Route
        path="/schedules"
        element={
          <TeacherVerification>
            <SchedulesPage />
          </TeacherVerification>
        }
      ></Route>
    </Routes>
  );
};

export default TeacherRoutes;
