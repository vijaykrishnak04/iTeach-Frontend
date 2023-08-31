import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Student/HomePage";
import StudentVerification from "../Verification/StudentVerification";
import CourseViewPage from "../Pages/Student/CourseViewPage";
import ChapterViewPage from "../Pages/Student/ChapterViewPage";
import CourseSectionPage from "../Pages/Student/CourseSectionPage";
import StudentProfilePage from "../Pages/Student/StudentProfilePage";

const StudentRoutes = () => {
  return (
    <Routes>
       <Route path="/home" element={<StudentVerification><HomePage/></StudentVerification>}></Route>
       <Route path="/course/:id" element={<StudentVerification><CourseViewPage/></StudentVerification>}></Route>
       <Route path="/class/subject" element={<StudentVerification><ChapterViewPage/></StudentVerification>}></Route>
       <Route path="/courses" element={<StudentVerification><CourseSectionPage/></StudentVerification>}></Route>
       <Route path="/profile" element={<StudentVerification><StudentProfilePage/></StudentVerification>}></Route>
    </Routes>
  );
};

export default StudentRoutes;
