import { Route, Routes } from "react-router-dom";
import TeacherHomePage from "../Pages/Teacher/TeacherHomePage";
import TeacherVerification from '../Verification/TeacherVerification'
import SubjectsViewPage from "../Pages/Teacher/SubjectsViewPage";
import AddChapterPage from "../Pages/Teacher/AddChapterPage";
import EditChapterPage from "../Pages/Teacher/EditChapterPage";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<TeacherVerification><TeacherHomePage/></TeacherVerification>}></Route>
      <Route path="/class/:id" element={<TeacherVerification><SubjectsViewPage/></TeacherVerification>}></Route>
      <Route path="/class/add-chapter" element={<TeacherVerification><AddChapterPage/></TeacherVerification>}></Route>
      <Route path="/class/edit-chapter" element={<TeacherVerification><EditChapterPage/></TeacherVerification>}></Route>
    </Routes>
  );
};

export default TeacherRoutes;
