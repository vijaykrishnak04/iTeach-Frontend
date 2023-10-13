import { useState } from "react";
import { Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const handleGetStartedClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white w-full z-20 top-0 left-0 border-b border-gray-200 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="h-10 mr-3" alt="i-Teach Logo" />
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-orange-400 hover:bg-orange-800 shadow-slate-400 shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transition-all duration-300"
              onClick={handleGetStartedClick}
            >
              Get started
            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  md:hidden "
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className={`w-5 h-5 transition-transform duration-500 ${
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
            } items-center justify-between w-full md:w-auto md:order-1 transition-all duration-300`}
            id="navbar-sticky"
          >
            <ul className="flex flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 ${
                    isActive("/")
                      ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-orange-400"
                      : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-orange-400 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }`}
                  aria-current="page"
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 ${
                    isActive("/about")
                      ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-orange-400"
                      : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-orange-400 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 ${
                    isActive("/pricing")
                      ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-orange-400"
                      : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-orange-400 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }`}
                >
                  <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />{" "}
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block py-2 pl-3 pr-4 rounded md:p-0 ${
                    isActive("/contact")
                      ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-orange-400"
                      : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0 md:dark:hover:text-orange-400 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }`}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <Modal
        title="Get Started"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null} // to remove default buttons
        className="rounded-xl" // Added to round the corners of the modal
      >
        <div className="flex flex-col space-y-4 items-center justify-center py-6">
          <Link to="/teacher-login" className="w-3/4">
            <button className="w-full bg-orange-500 hover:bg-orange-700 active:bg-orange-900 focus:ring focus:ring-orange-200 rounded-lg text-white text-lg font-semibold px-2 py-2 transition-all duration-300">
              Login as Teacher
            </button>
          </Link>

          <Link to="/login" className="w-3/4">
            <button className="w-full bg-orange-500 hover:bg-orange-700 active:bg-orange-900 focus:ring focus:ring-orange-200 rounded-lg text-white text-lg font-semibold px-2 py-2 transition-all duration-300">
              Login as Student
            </button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
