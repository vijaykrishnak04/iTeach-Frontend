import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarAlt,
  faBookOpen,
  faPencilAlt,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const TeacherNavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    try {
      localStorage.removeItem("teacherToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const teacherMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full max-w-screen z-20 top-0 left-0 border-b border-gray-200 shadow-100 overflow-x-hidden">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="h-10 mr-3" alt="i-Teach Logo" />
          </Link>
          <div className="flex md:order-2">
            <Dropdown overlay={teacherMenu} placement="bottomRight" arrow>
              <button
                type="button"
                className="flex mr-3 text-smrounded-full md:mr-0"
                id="user-menu-button"
                aria-expanded="false"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full border-2 border-gray-600"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user logo"
                />
              </button>
            </Dropdown>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isMenuOpen ? "rotate-90" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden md:flex"
            } w-full md:w-auto md:order-1 transition-all duration-1000`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/teacher/home"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/teacher/home"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm`}
                >
                  <FontAwesomeIcon icon={faHome} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/subject"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/teacher/subject"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm`}
                >
                  <FontAwesomeIcon icon={faBookOpen} />
                  <span>Subjects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/exams"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/teacher/exams"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                  <span>Exams</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/chats"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/student/chats"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm`}
                >
                  <FontAwesomeIcon icon={faComments} />
                  <span>Chats</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/schedules"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/teacher/schedules"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm`}
                >
                   <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Schedules</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TeacherNavBar;
