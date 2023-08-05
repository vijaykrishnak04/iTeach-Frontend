import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Student/HomePage";
import StudentVerification from "../Verification/StudentVerification";

const StudentRoutes = () => {
  return (
    <Routes>
       <Route path="/home" element={<StudentVerification><HomePage/></StudentVerification>}></Route>
    </Routes>
  );
};

export default StudentRoutes;
