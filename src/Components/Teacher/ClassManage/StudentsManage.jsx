import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStudentByIdsApi } from "../../../Services/Teacher";
import { Modal, Button } from "antd";
import ExamResult from "../../Student/Profile/ExamResult";

const StudentsManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  // Get the ids from the location state or default to your hardcoded value
  const ids = location.state?.students;

  const headers = {
    Authorization: localStorage.getItem("teacherToken"),
  };

  useEffect(() => {
    // Call your API and set the response to the state
    getStudentByIdsApi(ids, headers).then((response) => {
      setStudentsData(response.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const openStudentDetailsModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const filteredStudents = studentsData.filter((student) =>
    [student.fullName, student.email, student.phoneNumber.toString()].some(
      (data) => data.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleBlock = () => {
    // Handle the block logic here
  };

  const handleRemove = () => {
    // Handle the remove logic here
  };

  return (
    <div className="mt-10 p-10">
      <p className="text-lg font-bold mt-5 mb-3">Student Management</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-1/3"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50"
                onClick={() => openStudentDetailsModal(student)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {student?.fullName}
                </th>
                <td className="px-6 py-4">{student?.email}</td>
                <td className="px-6 py-4">{student?.phoneNumber}</td>
                <td className="px-6 py-4 text-left">
                  <button className="font-medium text-blue-600 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          title="Student Details"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="block" onClick={handleBlock}>
              Block Student
            </Button>,
            <Button key="remove" onClick={handleRemove}>
              Remove from Class
            </Button>,
          ]}
        >
          {selectedStudent && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {/* Student's photo */}
              <img
                src={selectedStudent?.studentImage?.url}
                alt="Student's Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  marginRight: "20px",
                }}
              />

              {/* Student Details */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  {selectedStudent?.fullName}
                </p>
                <p style={{ color: "gray", marginBottom: "10px" }}>
                  {selectedStudent?.email}
                </p>
                <p style={{ color: "gray", marginBottom: "10px" }}>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(selectedStudent?.dateOfBirth).toLocaleDateString()}
                </p>
                <p style={{ color: "gray", marginBottom: "10px" }}>
                  <strong>Address:</strong> {selectedStudent?.address}
                </p>
              </div>
            </div>
          )}

          {/* Exam Result */}
          <ExamResult exam={selectedStudent?.exam} />
        </Modal>
      </div>
    </div>
  );
};

export default StudentsManage;
