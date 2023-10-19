import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarAlt,
  faPencilAlt,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const TeacherNavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const teacherData = useSelector(
    (state) => state.teacherProfileData?.teacherProfileData
  );

  const handleLogout = () => {
    try {
      localStorage.removeItem("teacherToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("teacherToken");

    // Decoding JWT to get the payload
    const decodeToken = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (error) {
        return null;
      }
    };

    const payload = decodeToken(token);

    // If token is not valid or expired, handle logout
    if (!payload || payload.exp < Date.now() / 1000) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teacherMenu = (
    <Menu>
       <Menu.Item key="1">
          <Link to="/teacher/profile">Profile</Link>
        </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full max-w-screen z-20 top-0 left-0 border-b border-gray-200 shadow-md overflow-x-hidden">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="h-10 mr-3" alt="i-Teach Logo" />
          </Link>
          <div className="flex md:order-2">
          <p className="text-center font-semibold p-2">
              {teacherData.fullName}
            </p>
            <Dropdown overlay={teacherMenu} placement="bottomRight" arrow>
              <button
                type="button"
                className="flex mr-3 text-smrounded-full md:mr-0"
                id="user-menu-button"
                aria-expanded="false"
              >
                <span className="sr-only">Open user menu</span>
                {teacherData?.teacherImage?.url ? (
                  <img
                    className="w-10 h-10 rounded-full border-2"
                    src={teacherData?.teacherImage?.url}
                    alt="user logo"
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-full border-2"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="user logo"
                  />
                )}
              </button>
            </Dropdown>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  md:hidden "
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
                  } rounded hover:bg-gray-100 text-sm transition duration-300`}
                >
                  <FontAwesomeIcon icon={faHome} />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/teacher/exams"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/teacher/exams"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm transition duration-300`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                  <span>Exams</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/chats"
                  className={`flex flex-col items-center justify-center py-2 px-1 ${
                    location.pathname === "/teacher/chats"
                      ? "text-orange-600"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 text-sm transition duration-300`}
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
                  } rounded hover:bg-gray-100 text-sm transition duration-300`}
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
