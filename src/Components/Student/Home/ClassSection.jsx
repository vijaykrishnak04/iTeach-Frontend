/* eslint-disable react/prop-types, no-undef */

import { useState } from "react";
import { Modal, Button, message } from "antd";
import { createOrderApi, verifyPaymentApi } from "../../../Services/Student";

const ClassSection = ({ studentData, classData,  onPaymentSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const initiatePayment = async () => {
    try {
      const amount = selectedClass?.price * 100; // Convert amount to smallest unit for Razorpay

      const headers = {
        Authorization: localStorage.getItem("studentToken"),
      };
      const response = await createOrderApi(amount, headers);
      const data = response.data;

      const options = {
        key: "rzp_test_QlgFt3EDVpYyIC",
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

        const headers = {
          Authorization: localStorage.getItem("studentToken"),
      };
      const verificationResponse = await verifyPaymentApi({
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        classId: selectedClass?._id,
        studentId: studentData._id
      }, headers);

      const data = verificationResponse.data;
      if (data.success) {
        message.success("Payment successful!");
        onPaymentSuccess(true)
      } else {
        message.error("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      message.error("Error verifying payment. Please contact support.");
    }
  };

  return (
    <div className="p-5 rounded-xl bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {classData.map((classItem, index) => (
        <div
          key={index}
          className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleClassClick(classItem)}
        >
          <p className="text-lg text-center font-bold text-blue-600">
            {classItem.name}
          </p>
        </div>
      ))}

      <Modal
        title={<div className="text-center">{selectedClass?.name}</div>}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width="fit-content"
        centered={true} // To ensure the modal is vertically centered.
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
        <ul className="mb-4">
          {selectedClass?.subjects.map((subject, index) => (
            <li key={index} className="text-blue-400 mb-2">
              {subject.subjectName}
            </li>
          ))}
        </ul>
        <p className="mb-4 font-bold">Price: ${selectedClass?.price}</p>
      </Modal>
    </div>
  );
};

export default ClassSection;
