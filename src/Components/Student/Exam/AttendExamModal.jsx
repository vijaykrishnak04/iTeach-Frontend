/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Button, Radio, Form, message } from "antd";
import { useSelector } from "react-redux";
import { validateExamApi } from "../../../Services/Student";

const AttendExamModal = ({ examData = {}, isVisible, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(() =>
    examData.duration ? examData.duration * 60 : 0
  );
  const examId = examData._id;
  const studentId = useSelector((state) => state.studentData.studentData._id);

  useEffect(() => {
    setRemainingTime(examData.duration * 60);
  }, [examData.duration]);

  useEffect(() => {
    let timer;
    if (isVisible && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); // Decrement every second
    }

    // Cleanup the interval on unmount or if the modal becomes hidden
    return () => clearInterval(timer);
  }, [isVisible, remainingTime]);

  useEffect(() => {
    if (isVisible && remainingTime === 0) {
      handleSubmitExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime, isVisible]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const goToNextQuestion = () => {
    if (
      examData.questions &&
      currentQuestionIndex < examData.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    const data = {
      selectedAnswers,
      studentId,
    };
    const headers = {
      Authorization: localStorage.getItem("studentToken"),
    };

    // Make the API call
    validateExamApi(examId, data, headers)
      .then((response) => {
        if (response.status === 200) {
          // Assuming 200 status indicates success, modify as per your API's specifications
          message.success("Exam submitted successfully");
        } else {
          message.error("Error submitting exam");
        }
        onClose();
      })
      .catch((error) => {
        message.error("Error submitting exam");
        console.error("There was an error submitting the exam:", error);
        onClose();
      });
  };

  if (!isVisible || !examData.questions) return null;

  return (
    <Modal
      title={`${examData.title} - Class: ${examData.class}`}
      style={{ textAlign: "center" }}
      open={isVisible} // Use 'visible' prop instead of 'open'
      footer={[
        <Button
          key="previous"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          style={{ marginRight: "10px" }} // Add some space between buttons
        >
          Previous
        </Button>,
        <Button
          key="next"
          onClick={goToNextQuestion}
          disabled={currentQuestionIndex === examData.questions.length - 1}
          style={{ marginRight: "10px" }} // Add some space between buttons
        >
          Next
        </Button>,
        <Button
          key="submit"
          className="bg-blue-500"
          type="primary"
          onClick={handleSubmitExam}
        >
          Submit Exam
        </Button>,
      ]}
    >
      <Form>
        <div style={{ textAlign: "start", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "initial" }}>
            {examData.questions[currentQuestionIndex].text}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>
            Time Remaining :{" "}
          </h4>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </h2>
        </div>

        <Radio.Group
          value={selectedAnswers[currentQuestionIndex]}
          onChange={(e) => {
            setSelectedAnswers({
              ...selectedAnswers,
              [currentQuestionIndex]: e.target.value,
            });
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          {examData.questions[currentQuestionIndex].answers.map(
            (answer, index) => (
              <Radio
                key={index}
                value={index}
                style={{ margin: "5px 0" }} // Add vertical margin for better spacing
              >
                {answer}
              </Radio>
            )
          )}
        </Radio.Group>
      </Form>
    </Modal>
  );
};

export default AttendExamModal;
