import { Modal, Button, Input, Form, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  forgotPasswordApi,
  forgotPasswordOtpApi,
} from "../../../Services/Student";
import OTPPage from "../Otp/Otp";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const ForgotPasswordModal = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);
  const [emailToSend, setEmailToSend] = useState("");

  const handleForgotPassword = async () => {
    try {
      const values = await form.validateFields();
      const email = values.email;
      setEmailToSend(email); // Update the state

      forgotPasswordApi(email)
        .then((result) => {
          if (result.status === 200) {
            form.resetFields();
            setIsOTPModalVisible(true);
            onClose();
          } else {
            message.error(result.message || "Could not change the password");
          }
        })
        .catch((result) => {
          if (result.response.status === 404) {
            form.setFields([
              {
                name: "email",
                errors: [result.response.data],
              },
            ]);
          } else {
            message.error(
              result.response.data || "Could not change the password"
            );
          }
        });
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <Modal
        title={
          <div className="text-center">
            <span style={{ borderBottom: "2px solid lightcoral" }}>
              Forgot Password
            </span>
          </div>
        }
        open={isVisible}
        onCancel={onClose}
        footer={null}
        centered // This will center the modal vertically
      >
        <div className="text-center mb-4">
          <FontAwesomeIcon icon={faEnvelope} />{" "}
          <span>
            Please enter your email address to receive a verification code
          </span>
        </div>

        <Form form={form} className="space-y-4">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email address" },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Form>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleForgotPassword}
            type=""
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold"
          >
            Send
          </Button>
        </div>
      </Modal>
      <OTPPage
        isVisible={isOTPModalVisible}
        onClose={() => setIsOTPModalVisible(false)}
        StudentAuth={emailToSend} // Here
        StudentOtpApi={forgotPasswordOtpApi}
        resend={forgotPasswordApi}
      />
    </>
  );
};

export default ForgotPasswordModal;
