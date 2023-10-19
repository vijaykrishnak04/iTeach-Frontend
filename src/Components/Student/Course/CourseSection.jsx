import { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import { SimplePagination } from "./SimplePagination";
import {
  createOrderApi,
  getCoursesApi,
  verifyPaymentApi,
} from "../../../Services/Student";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addPurchasedCourse } from "../../../Redux/Features/Student/CoursesSlice";

// eslint-disable-next-line react/prop-types
const CourseSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4); // 4 because we want to show 2 cards in a row and 2 rows in total
  const studentId = useSelector((state) => state.studentData.studentData._id);
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const filteredCourses = coursesData
    ? coursesData.filter((course) => {
        return course.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  useEffect(() => {
    setIsLoading(true); // Start the loading
    getCoursesApi(studentId)
      .then((response) => {
        setCoursesData(response.data);
        setIsLoading(false); // End the loading
      })
      .catch(() => setIsLoading(false));
  }, [studentId]);

  const handleCourseClick = (courseItem) => {
    setSelectedCourse(courseItem);
    setIsModalOpen(true);
  };

  const initiatePayment = async () => {
    try {
      setIsModalOpen(false);
      const amount = selectedCourse?.price * 100; // Convert amount to smallest unit for Razorpay
      const response = await createOrderApi(amount);
      const data = response.data;

      const options = {
        key: `${import.meta.env.VITE_REACT_APP_RAZORPAY_KEY}`,
        amount,
        currency: "INR",
        name: "I teach",
        description: `Payment for ${selectedCourse?.title}`,
        order_id: data.orderId,
        handler: (response) => {
          verifyPayment(response);
        },
      };

      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open();
    } catch (error) {
      console.log(error);
      message.error("Error initiating payment. Please try again!");
    }
  };

  const verifyPayment = async (response) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response;
      const verificationResponse = await verifyPaymentApi(
        {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          signature: razorpay_signature,
          courseId: selectedCourse._id,
          studentId: studentId,
        }
      );

      const data = verificationResponse.data;

      if (data.success) {
        message.success(data.message);
        setCoursesData((previousCourses) =>
          previousCourses.filter((course) => course._id !== selectedCourse._id)
        );
        dispatch(addPurchasedCourse(data.course));
      } else {
        message.error("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      message.error("Error verifying payment. Please contact support.");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Explore New Courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 w-full border rounded"
      />

      {isLoading ? (
        <div className="flex justify-center text-3xl font-thin">
          <FontAwesomeIcon icon={faSpinner} spin />{" "}
        </div> // This is where your loading animation will go
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentCourses.map((course) => (
            <div
              key={course._id}
              className="flex space-x-4 rounded overflow-hidden shadow-lg p-4 bg-white transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleCourseClick(course)}
            >
              <img
                className="w-24 h-24 object-cover"
                src={course.thumbnail.url}
                alt={course.title}
              />
              <div className="flex flex-col justify-center">
                <div className="font-medium text-md sm:text-lg truncate">
                  {course.title}
                </div>
                <div className="text-xs overflow-auto">
                  {course.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Component */}
      <div className="flex items-center justify-center text-center mt-4">
        <SimplePagination
          active={currentPage}
          setActive={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Payment Modal */}
      <Modal
        title="Confirm Purchase"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            className="bg-blue-500"
            type="primary"
            onClick={initiatePayment}
          >
            Buy Now
          </Button>,
        ]}
      >
        <div className="flex space-x-4 rounded overflow-hidden my-4 shadow-lg p-2 bg-white">
          <img
            className="w-24 h-24 object-cover"
            src={selectedCourse?.thumbnail.url}
            alt={selectedCourse?.title}
          />
          <div className="flex flex-col justify-center">
            <div className="font-medium text-md sm:text-lg truncate">
              {selectedCourse?.title}
            </div>
            <div className="text-xs overflow-auto">
              {selectedCourse?.description}
            </div>
            <span className="font-semibold text-base">
              ₹{selectedCourse?.price} ?
            </span>
          </div>
        </div>
        <p>
          Are you sure you want to purchase {selectedCourse?.title} for{" "}
          <span className="font-semibold text-base">
            ₹{selectedCourse?.price} ?
          </span>
        </p>
      </Modal>
    </>
  );
};

export default CourseSection;
