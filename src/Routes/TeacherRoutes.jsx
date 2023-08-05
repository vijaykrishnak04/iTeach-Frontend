import { Route, Routes } from "react-router-dom";
import TeacherHomePage from "../Pages/Teacher/TeacherHomePage";
import TeacherVerification from '../Verification/TeacherVerification'

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<TeacherVerification><TeacherHomePage/></TeacherVerification>}></Route>
    </Routes>
  );
};

export default TeacherRoutes;
