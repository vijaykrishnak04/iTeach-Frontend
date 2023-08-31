/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ClassModal = ({ isOpen, onClose, onSave, currentSyllabus }) => {
  const isEditing = Boolean(currentSyllabus);
  const [name, setName] = useState(currentSyllabus ? currentSyllabus.name : "");
  const [price, setPrice] = useState(
    currentSyllabus ? currentSyllabus.price : ""
  );
  const [subjects, setSubjects] = useState(
    currentSyllabus ? currentSyllabus.subjects.join(", ") : []
  );
  const [subject, setSubject] = useState(""); // Temporary state for the input

  useEffect(() => {
    setName(currentSyllabus ? currentSyllabus.name : "");
    setSubjects(
      currentSyllabus
        ? currentSyllabus.subjects
            .map((subject) => subject.subjectName)
            .join(", ")
        : ""
    );
    setPrice(currentSyllabus ? currentSyllabus.price : ""); // Update the price here
  }, [currentSyllabus]);

  const resetForm = () => {
    setName("");
    setSubjects([]);
    setSubject("");
    setPrice("");
  };

  const handleSave = () => {
    if (!name.trim() || subjects.length === 0) {
      // You can show a message or highlight the required fields here
      return;
    }

    // Save the syllabus data
    onSave({
      name,
      price: parseFloat(price),
      subjects:
        subjects instanceof Array
          ? subjects
          : subjects.split(",").map((subject) => subject.trim()), // Handling subjects as both array and comma-separated string
    });
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      title={isEditing ? "Edit Syllabus" : "Add Syllabus"} // Title based on mode
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      className="text-center"
    >
      <div className="p-4">
        <div className="mb-4 ">
          <label
            className="block text-start text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name of Syllabus
          </label>
          <Input
            className="w-full p-2 border rounded"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter syllabus name..."
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block text-start text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price to Enroll
          </label>
          <Input
            className="w-full p-2 border rounded"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price..."
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mr-2"
            htmlFor="subjects"
          >
            Subjects
          </label>
          <div className="flex w-full">
            <Input
              className="w-full mr-1"
              type="text"
              id="subject"
              value={subject}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSubjects([...subjects, subject]);
                  setSubject("");
                }
              }}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter a subject..."
            />
            <Button
              type="primary"
              onClick={() => {
                setSubjects([...subjects, subject]);
                setSubject("");
              }}
              className="bg-blue-500 hover:bg-blue-700 rounded"
            >
              <FontAwesomeIcon icon={faPlus} /> {/* FontAwesome icon here */}
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap">
          {subjects instanceof Array
            ? subjects.map((sub, index) => (
                <div
                  key={index}
                  className="inline-block p-2 m-2 border rounded bg-gray-100"
                >
                  {sub}{" "}
                  <Button
                    onClick={() => {
                      const updatedSubjects = subjects.filter(
                        (_, i) => i !== index
                      );
                      setSubjects(updatedSubjects);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    x
                  </Button>
                </div>
              ))
            : subjects}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
          >
            {currentSyllabus ? "Edit" : "Add"} Syllabus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClassModal;
