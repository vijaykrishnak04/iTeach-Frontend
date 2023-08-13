import { useState } from "react";
import { message } from "antd";
import SyllabusModal from "./SyllabusModal";

const SyllabusManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [syllabusData, setSyllabusData] = useState([
    { name: "Class 9 SCERT", subjects: ["English", "Maths", "Science"] },
    // You can add more syllabus here...
  ]);

  const filteredSyllabus = syllabusData.filter((syllabus) => {
    return (
      syllabus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      syllabus.subjects.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddSyllabus = (syllabus) => {
    setSyllabusData([...syllabusData, syllabus]);
    message.success("Syllabus added successfully");
  };

  const handleEditSyllabus = async (syllabus) => {
    // Logic to edit syllabus
    message.success("Syllabus edited successfully");
  };

  const handleRemoveSyllabus = async (syllabusIndex) => {
    // Logic to remove syllabus
    message.success("Syllabus removed successfully");
  };

  return (
    <div className="mt-10 p-10">
      <p className="text-lg font-bold mt-5">Syllabus Management</p>
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={() => setIsModalOpen(true)}
        >
          Add Syllabus
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search syllabus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        {/* Table structure similar to above code */}
      </div>

      {/* Modal for adding or editing a syllabus */}
      <SyllabusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSyllabus}
      />
    </div>
  );
};

export default SyllabusManage;
