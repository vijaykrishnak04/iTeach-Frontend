import { Route, Routes } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import StudentLoginPage from "../Pages/Landing/StudentLoginPage";
import SignupPage from "../Pages/Landing/SignupPage";
import TeacherLoginPage from "../Pages/Landing/TeacherLoginPage";
import OtpPage from "../Pages/Landing/OtpPage";
import StudentVerification from "../Verification/StudentVerification";
import TeacherVerification from "../Verification/TeacherVerification";
const LandingPageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<StudentVerification><SignupPage/></StudentVerification>}></Route>
      <Route path='/login' element={<StudentVerification><StudentLoginPage/></StudentVerification>}></Route>
      <Route path="/otp-page" element={<StudentVerification><OtpPage/></StudentVerification>}></Route>
      <Route path="/teacher-login" element={<TeacherVerification><TeacherLoginPage /></TeacherVerification>} />
    </Routes>
  );
};

export default LandingPageRoutes;