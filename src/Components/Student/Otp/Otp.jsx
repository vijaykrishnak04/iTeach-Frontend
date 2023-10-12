/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { message, Modal, Form, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import ChangePasswordModal from "../Auth/ChangePasswordModal";

const OTPPage = ({
  isVisible,
  onClose,
  StudentAuth,
  StudentOtpApi,
  resend,
}) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [showResend, setShowResend] = useState(false);
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setShowResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleValidation = async () => {
    try {
      const values = await form.validateFields();

      const dataToSend = {
        StudentAuth,
        otp: values.otp,
      };

      StudentOtpApi(dataToSend)
        .then((response) => {
          if (response.data.message === "Success, account created!") {
            message.success(
              response.data.message || "OTP Verified Successfully"
            );
            navigate("/login");
            onClose();
          } else {
            setIsOTPModalVisible(true);
            onClose();
          }
        })
        .catch((response) => {
          form.setFields([
            {
              name: "otp",
              errors: [response.response.data.error || "Verification failed"],
            },
          ]);
        });
    } catch (error) {
      return;
    }
  };
  const focusNext = (index, value) => {
    if (index < 5 && value !== "") {
      otpRefs.current[index + 1].focus();
    }
  };

  const otpValue = () => {
    let value = "";
    otpRefs.current.forEach((input) => {
      value += input.value;
    });
    form.setFieldsValue({ otp: value });
  };

  const handleResendOtp = () => {
    try {
      if (StudentAuth) {
        const email = StudentAuth.email;
        resend(email).then((response) => {
          if (response.status === 200) {
            setTimeLeft(180);
            setShowResend(false);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal
        title={
          <div className="text-center text-lg">
            <span style={{ borderBottom: "2px solid lightcoral" }}>
              Enter Otp
            </span>
          </div>
        }
        open={isVisible}
        onCancel={onClose}
        footer={null}
        centered
      >
        <Form form={form} className="space-y-4  p-4">
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "OTP is required",
              },
            ]}
            hasFeedback
          >
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <input
                  ref={(el) => (otpRefs.current[index] = el)}
                  className="w-8 h-8 border-2 border-black rounded-md text-center text-lg text-black"
                  maxLength="1"
                  key={index}
                  onChange={(e) => {
                    focusNext(index, e.target.value);
                    setTimeout(() => {
                      otpValue();
                    }, 0);
                  }}
                  style={{ fontSize: "1.5rem" }}
                />
              ))}
            </div>
          </Form.Item>
        </Form>
        <div className="flex justify-between items-center text-lg p-3">
          <Button
            type="button"
            onClick={handleValidation}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center"
          >
            Submit
          </Button>
          <div className="flex items-center">
            {showResend ? (
              <Button
                type="button"
                onClick={() => handleResendOtp}
                className="bg-red-500 hover:bg-red-600 text-white flex items-center space-x-1"
              >
                <FontAwesomeIcon icon={faRedo} className="align-middle" />
                Resend OTP
              </Button>
            ) : (
              <div className="text-black font-semibold">
                Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
              </div>
            )}
          </div>
        </div>
      </Modal>
      <ChangePasswordModal
        isVisible={isOTPModalVisible}
        onClose={() => setIsOTPModalVisible(false)}
        email={StudentAuth}
      />
    </>
  );
};

export default OTPPage;
