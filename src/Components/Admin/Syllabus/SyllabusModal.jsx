/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Input, Button } from "antd";

const SyllabusModal = ({ isOpen, onClose, onSave, syllabus }) => {
  const [name, setName] = useState(syllabus ? syllabus.name : "");
  const [subjects, setSubjects] = useState(syllabus ? syllabus.subjects.join(", ") : "");

  const handleSave = () => {
    onSave({
      name,
      subjects: subjects.split(",").map((subject) => subject.trim()),
    });
    setName("");
    setSubjects("");
    onClose();
  };

  return (
    <Modal
      title={syllabus ? "Edit Syllabus" : "Add Syllabus"}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name of Syllabus
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter syllabus name..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjects">
            Subjects
          </label>
          <Input
            type="text"
            id="subjects"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="Enter subjects separated by commas..."
          />
        </div>
        <div className="flex justify-end">
          <Button type="primary" onClick={handleSave}>
            {syllabus ? "Edit" : "Add"} Syllabus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SyllabusModal;
