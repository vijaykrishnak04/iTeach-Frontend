import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Admin/Login";
import AdminVerificaton from '../Verification/AdminVerification'
import DashboardPage from "../Pages/Admin/DashboardPage";
import TeacherManagePage from "../Pages/Admin/TeacherManagePage";
import CourseManagePage from "../Pages/Admin/CourseManagePage";
import AddCoursePage from "../Pages/Admin/AddCoursePage";



const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminVerificaton><Login/></AdminVerificaton>}></Route>
      <Route path="/dashboard" element={<AdminVerificaton><DashboardPage/></AdminVerificaton>}></Route>
      <Route path="/teachers" element={<AdminVerificaton><TeacherManagePage/></AdminVerificaton>}></Route>
      <Route path="/courses" element={<AdminVerificaton><CourseManagePage/></AdminVerificaton>}></Route>
      <Route path="/add-course" element={<AdminVerificaton><AddCoursePage/></AdminVerificaton>}></Route>
    </Routes>
  );
};

export default AdminRoutes;