/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Input, Button, Form } from "antd";
import validator from "validator";

const AddLessonModal = ({
  isOpen,
  onClose,
  saveLesson,
  editLessonIndex,
  lessonToEdit,
}) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [pdfNotes, setPdfNotes] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lessonToEdit) {
      setLessonTitle(lessonToEdit.lessonTitle);
      setVideoURL(lessonToEdit.videoURL);
      setLessonDescription(lessonToEdit.lessonDescription);
    } else {
      setLessonTitle("");
      setVideoURL("");
      setLessonDescription("");
      setPdfNotes(null);
    }
  }, [lessonToEdit]);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfNotes(file);
    }
  };

  const clearState = () => {
    setLessonTitle("");
    setVideoURL("");
    setLessonDescription("");
    setPdfNotes(null);
  };

  const handleSubmit = () => {
    const errors = {};
    if (validator.isEmpty(lessonTitle.trim())) {
      errors.lessonTitle = "Title is required";
    }

    if (validator.isEmpty(videoURL.trim())) {
      errors.videoURL = "video URL is required";
    }

    if (validator.isEmpty(lessonDescription.trim())) {
      errors.lessonDescription = "Description is required";
    }

    if (Object.keys(errors).length === 0) {
      const lesson = {
        lessonTitle,
        videoURL,
        lessonDescription,
        pdfNotes,
      };
      saveLesson(lesson);
      clearState();
      onClose();
    } else {
      setErrors(errors);
    }
  };

  return (
    <Modal
      visible={isOpen}
      title="Add a Lesson"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" className="bg-blue-600" onClick={handleSubmit}>
          {editLessonIndex !== null ? "Update Lesson" : "Add Lesson"}
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item
          label="Lesson Title"
          help={errors.lessonTitle}
          validateStatus={errors.lessonTitle ? "error" : ""}
        >
          <Input
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Video URL"
          help={errors.videoURL}
          validateStatus={errors.videoURL ? "error" : ""}
        >
          <Input
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Lesson Description"
          help={errors.lessonDescription}
          validateStatus={errors.lessonDescription ? "error" : ""}
        >
          <Input.TextArea
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="PDF Notes">
          <input type="file" onChange={handlePdfChange} accept=".pdf" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLessonModal;
