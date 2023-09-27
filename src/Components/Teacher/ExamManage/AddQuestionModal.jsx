/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Radio } from "antd";

const AddQuestionModal = ({
  isOpen,
  onClose,
  saveQuestion,
  editQuestionIndex,
  questionToEdit,
}) => {
  const initialAnswers = ["", "", "", ""];
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState(initialAnswers);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [questionError, setQuestionError] = useState(null);
  const [answerErrors, setAnswerErrors] = useState([]);

  useEffect(() => {
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit.text);
      setAnswers(questionToEdit.answers);
      setCorrectAnswer(questionToEdit.correctAnswer);
    } else {
      setCurrentQuestion("");
      setAnswers(initialAnswers);
      setCorrectAnswer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const validateForm = () => {
    let isValid = true;

    if (!currentQuestion.trim()) {
      setQuestionError("Please input the question!");
      isValid = false;
    } else {
      setQuestionError(null);
    }

    const newAnswerErrors = answers.map((answer) =>
      !answer.trim() ? "Option cannot be empty!" : null
    );

    if (newAnswerErrors.some((error) => error !== null)) {
      isValid = false;
    }

    setAnswerErrors(newAnswerErrors);

    if (correctAnswer === null) {
      isValid = false;
      // You might also want to provide feedback for not selecting a correct answer
    }

    return isValid;
  };

  const clearState = () => {
    setCurrentQuestion("");
    setAnswers(initialAnswers);
    setCorrectAnswer(null);
    setSelectedImage(null);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const question = {
        text: currentQuestion,
        answers: answers,
        correctAnswer: correctAnswer,
      };

      if (selectedImage) {
        question.image = selectedImage;
      }

      saveQuestion(question);
      clearState();
      onClose();
    }
  };

  return (
    <Modal
      title="Add MCQ Question"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" type="button" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-blue-600"
          onClick={handleSubmit}
        >
          {editQuestionIndex !== null ? "Update Question" : "Add Question"}
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          label="Question"
          help={questionError} // Display error message
          validateStatus={questionError ? "error" : ""}
        >
          <Input
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Image (Optional)">
          <Input
            type="file"
            onChange={handleImageChange}
            accept=".jpeg, .jpg, .png"
          />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Preview"
              style={{ width: "75%", maxHeight: "300px", padding: "0.5rem" }}
            />
          )}
        </Form.Item>

        {answers.map((answer, index) => (
          <Form.Item
            key={index}
            label={`Option ${String.fromCharCode(65 + index)}`}
          >
            <Radio.Group
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            >
              <Radio value={index}>
                <Input
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  help={answerErrors[index]}
                  validateStatus={answerErrors[index] ? "error" : ""}
                />
              </Radio>
            </Radio.Group>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default AddQuestionModal;
