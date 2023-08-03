import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();
  const studentToken = localStorage?.getItem("StudentToken");

  const handleGetStartedClick = () => {
    setModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("StudentToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const userMenu = (
    <Menu>
      {studentToken ? (
        <Menu.Item key="1">
          <Link to="/student/profile">Profile</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="2">
          <Link to="/login">Student Login</Link>
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleLogout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalClickOutside = (event) => {
    if (modalRef.current === event.target) {
      handleModalClose();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow-100">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img src="/logo.png" className="h-10 mr-3" alt="i-Teach Logo" />
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-orange-400 hover:bg-orange-800 shadow-slate-400 shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              onClick={handleGetStartedClick}
            >
              Get started
            </button>
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
              isMenuOpen ? "hidden" : "flex"
            } items-center justify-between w-full md:w-auto md:order-1 transition-all duration-300`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-orange-400"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-blue-500 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-blue-500 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-blue-500 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          onClick={handleModalClickOutside}
          style={{ opacity: isModalOpen ? 1 : 0 }}
        >
          <div
            className="bg-white p-4 rounded-lg transform transition-all duration-300 ease-in-out"
            style={{
              transform: isModalOpen ? "scale(1)" : "scale(0.9)",
              opacity: isModalOpen ? 1 : 0,
            }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
              onClick={handleModalClose}
            >
              Close
            </button>
            <div className="flex flex-col items-center space-y-4">
              <a
                href="/teacherlogin"
                className="text-white bg-orange-400 hover:bg-orange-800 shadow-slate-400 shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-200"
              >
                Login as Teacher
              </a>
              <a
                href="/login"
                className="text-white bg-orange-400 hover:bg-orange-800 shadow-slate-400 shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-200"
              >
                Login as Student
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
