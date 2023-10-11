import { useState, useEffect } from "react";
import { message, Modal } from "antd";
import ClassModal from "./ClassModal";
import {
  addSyllabus,
  deleteSyllabus,
  getSyllabuses,
} from "../../../Redux/Features/Admin/syllabusSlice";
import { useDispatch, useSelector } from "react-redux";

const ClassManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const syllabusData = useSelector((state) => state.syllabusData.syllabusList);

  const dispatch = useDispatch();
  const { confirm } = Modal;

  useEffect(() => {
    dispatch(getSyllabuses());
  }, [dispatch]);

  const [currentSyllabus, setCurrentSyllabus] = useState(null); // state to hold current syllabus being edited

  const filteredSyllabus = Array.isArray(syllabusData)
    ? syllabusData.filter((syllabus) => {
        return (
          syllabus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          syllabus.subjects
            .join(", ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const handleAddSyllabus = async (syllabus) => {
    try {
      console.log(syllabus);
      const resultAction = await dispatch(addSyllabus(syllabus));
      const { payload } = resultAction;
      // Check if the action was fulfilled
      if (addSyllabus.fulfilled.match(resultAction)) {
        if (!payload.error) {
          message.success("Added class successfully");
        } else {
          console.log(payload.message);
        }
      }
    } catch (err) {
      console.log(err);
      message.error("An unexpected error occurred");
    }
  };

  const handleEditSyllabus = (index, updatedSyllabus) => {
    // Update the syllabus
    const newSyllabusData = [...syllabusData];
    newSyllabusData[index] = updatedSyllabus;
    message.success("Syllabus edited successfully");
  };

  const handleRemoveSyllabus = (syllabusId) => {
    confirm({
      title: "Are you sure you want to delete this syllabus?",
      content: "Once deleted, this syllabus cannot be recovered.",
      async onOk() {
        try {
          const resultAction = await dispatch(deleteSyllabus(syllabusId));
          const { payload } = resultAction;
          // Check if the action was fulfilled
          if (deleteSyllabus.fulfilled.match(resultAction)) {
            if (!payload.error) {
              message.success("Deleted syllabus successfully");
            } else {
              console.log(payload.message);
            }
          }
        } catch (err) {
          console.log(err);
          message.error("An unexpected error occurred");
        }
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <div className="mt-10 p-10">
      <p className="text-lg font-bold mt-5">Class Management</p>
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={() => setIsModalOpen(true)}
        >
          Add Class
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name of Class
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Subjects
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSyllabus.map((syllabus, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{syllabus.name}</td>
                <td className="px-6 py-4">{syllabus.price.toFixed(2)}</td>

                <td className="px-6 py-4">
                  {syllabus.subjects
                    .map((subject) => subject.subjectName)
                    .join(", ")}
                </td>

                <td className="px-6 py-4 text-left">
                  {/* Action buttons (Edit and Remove) */}
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setCurrentSyllabus({ index, syllabus });
                        setIsModalOpen(true);
                      }}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => handleRemoveSyllabus(syllabus._id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding or editing a syllabus */}
      <ClassModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentSyllabus(null); // Clear the current syllabus being edited when modal closes
        }}
        onSave={
          currentSyllabus
            ? handleEditSyllabus.bind(null, currentSyllabus.index)
            : handleAddSyllabus
        }
        currentSyllabus={currentSyllabus && currentSyllabus.syllabus} // Pass the current syllabus being edited
      />
    </div>
  );
};

export default ClassManage;
