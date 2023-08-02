import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPageRoutes from './Routes/LandingPageRoutes'
import AdminRoutes from "./Routes/AdminRoutes";
import StudentRoutes from "./Routes/StudentRoutes";
import  './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<LandingPageRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/student/*" element={<StudentRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;