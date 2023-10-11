import { Route, Routes } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import StudentLoginPage from "../Pages/Landing/StudentLoginPage";
import SignupPage from "../Pages/Landing/SignupPage";
import TeacherLoginPage from "../Pages/Landing/TeacherLoginPage";
import StudentVerification from "../Verification/StudentVerification";
import TeacherVerification from "../Verification/TeacherVerification";
import ContactPage from "../Pages/Landing/ContactPage";
import AboutPage from "../Pages/Landing/AboutPage";
import PricingPage from "../Pages/Landing/PricingPage";
const LandingPageRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <StudentVerification>
            <Landing />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <StudentVerification>
            <SignupPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <StudentVerification>
            <StudentLoginPage />
          </StudentVerification>
        }
      ></Route>
      <Route
        path="/teacher-login"
        element={
          <TeacherVerification>
            <TeacherLoginPage />
          </TeacherVerification>
        }
      />
      <Route path="/contact" element={<ContactPage />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/pricing" element={<PricingPage />}></Route>
    </Routes>
  );
};

export default LandingPageRoutes;
