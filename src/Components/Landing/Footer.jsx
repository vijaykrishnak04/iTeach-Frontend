import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center py-10 bg-dark-blue">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="flex mb-6 items-center">
          <img src="/logo.png" width="200" alt="I-Teach" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4 pt-4 pb-6">
          <li>
            <Link to="/" className="text-gray-700 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:underline">
              About
            </Link>
          </li>
          {/* ... add more navigation links as per your app structure */}
        </ul>

        {/* App Links */}
        <div className="flex space-x-4">
          <a
            href="path_to_web_version"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-black text-white py-2 px-4 rounded"
          >
            Web
          </a>
          <a
            href="path_to_app_store"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-black text-white py-2 px-4 rounded"
          >
            iOS
          </a>
          <a
            href="path_to_play_store"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-black text-white py-2 px-4 rounded"
          >
            Android
          </a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mt-6">
          <a
            href="your_facebook_link"
            className="btn bg-gray-300 text-gray-700 p-2 rounded-full"
          >
            <i className="bx bxl-facebook"></i>
          </a>
          {/* ... add more social links */}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-300 text-center pt-6">
          © All rights reserved. Designed by{" "}
          <Link to="designer_link" className="text-blue-600 hover:underline">
            Vijay krishna
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
