import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Admin/Login";
import AdminVerificaton from '../Verification/AdminVerification'
import DashboardPage from "../Pages/Admin/DashboardPage";
import TeacherManagePage from "../Pages/Admin/TeacherManagePage";




const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminVerificaton><Login/></AdminVerificaton>}></Route>
      <Route path="/dashboard" element={<AdminVerificaton><DashboardPage/></AdminVerificaton>}></Route>
      <Route path="/teachers" element={<AdminVerificaton><TeacherManagePage/></AdminVerificaton>}></Route>
    </Routes>
  );
};

export default AdminRoutes;