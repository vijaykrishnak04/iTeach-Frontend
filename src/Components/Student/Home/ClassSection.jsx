/* eslint-disable react/prop-types, no-undef */

import { useState } from "react";
import { Modal, Button, message } from "antd";
import { createOrderApi, verifyPaymentApi } from "../../../Services/Student";

const ClassSection = ({ studentData, classData, onPaymentSuccess = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const initiatePayment = async () => {
    try {
      setIsModalOpen(false)
      const amount = selectedClass?.price * 100; // Convert amount to smallest unit for Razorpay
      const response = await createOrderApi(amount);
      const data = response.data;

      const options = {
        key: `${import.meta.env.VITE_REACT_APP_RAZORPAY_KEY}`,
        amount,
        currency: "INR",
        name: "I teach",
        description: `Payment for ${selectedClass?.name}`,
        order_id: data.orderId,
        handler: (response) => {
          verifyPayment(response);
          setIsModalOpen(false);
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
          classId: selectedClass?._id,
          studentId: studentData,
        }
      );

      const data = verificationResponse.data;
      if (data.success) {
        message.success("Payment successful!");
        if (onPaymentSuccess) {
          onPaymentSuccess(true);
        }
      } else {
        message.error("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.log(error);
      message.error("Error verifying payment. Please contact support.");
    }
  };

  return (
    <div className="p-5 rounded-xl bg-gray-100 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {classData.map((classItem, index) => (
        <div
          key={index}
          className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleClassClick(classItem)}
        >
          <p className="text-lg text-center font-bold text-black">
            {classItem.name}
          </p>
        </div>
      ))}
      <Modal
        title={<div className="text-center">{selectedClass?.name}</div>}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={600} // Consider specifying a width in pixels, especially for desktop views
        centered={true}
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
            Select Class And Pay
          </Button>,
        ]}
      >
        {/* Display Thumbnail */}
        {selectedClass?.thumbnail?.url && (
          <div className="flex justify-center my-2">
            <img
              src={selectedClass.thumbnail.url}
              alt={`${selectedClass?.name} Thumbnail`}
              className="max-w-full h-auto" // These classes will make sure the image fits the container
              style={{ maxHeight: "200px" }} // Limit the height
            />
          </div>
        )}

        {/* Display Description */}
        {selectedClass?.description && (
          <p className="mb-4">{selectedClass.description}</p>
        )}

        {/* Display Price */}
        <p className="mb-4 font-bold">Price: ₹{selectedClass?.price}</p>

        {/* Display Subjects under a heading */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Subjects Included:</h3>
          <div className="grid grid-cols-3 gap-2">
            {" "}
            {/* Three subjects in a row */}
            {selectedClass?.subjects.map((subject, index) => (
              <div key={index} className="bg-blue-100 p-2 rounded text-center">
                {subject.subjectName}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClassSection;
