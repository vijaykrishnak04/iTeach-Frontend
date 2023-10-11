import { Modal, Button, Input, Form, message } from "antd";

import validator from "validator"; // Make sure to import validator
import { changePasswordApi } from "../../../Services/Teacher";

// eslint-disable-next-line react/prop-types
const ChangePasswordModal = ({ id, isVisible, onClose }) => {
  const [form] = Form.useForm();
  const handleValidation = async () => {
    try {
      const values = await form.validateFields();
      if (values.newPassword === values.currentPassword) {
        form.setFields([
          {
            name: "newPassword",
            errors: [
              "New password should be different from the current password",
            ],
          },
        ]);
        return;
      }

      if (values.newPassword !== values.confirmPassword) {
        form.setFields([
          {
            name: "confirmPassword",
            errors: ["New password and confirm password must match"],
          },
        ]);
        return;
      }

      const credentials = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      const headers = {
        Authorization: localStorage.getItem("teacherToken"),
      };

      changePasswordApi(id, credentials, headers)
        .then((result) => {
          if (result.status === 200) {
            message.success("Password changed successfully");
            form.resetFields()
            onClose();
          } else {
            message.error(result.message || "Could not change the password");
          }
        })
        .catch((result) => {
          if (result.response.status === 400) {
            form.setFields([
              {
                name: "currentPassword",
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
      message.error("Validation failed");
    }
  };

  return (
    <Modal
      title={<div className="text-center">Change Password</div>}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form form={form} className="space-y-4">
        <Form.Item
          name="currentPassword"
          rules={[{ required: true, message: "Current password is required" }]}
          hasFeedback
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "New password is required" },
            () => ({
              validator(_, value) {
                if (validator.isStrongPassword(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Your password must be strong. Include a mix of letters, numbers, and symbols."
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Confirm password is required" }]}
          hasFeedback
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
      </Form>

      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleValidation}
          type="primary"
          className="bg-blue-500 hover:bg-blue-600 text-black"
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
