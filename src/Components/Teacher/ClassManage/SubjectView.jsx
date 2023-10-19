import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClassById } from "../../../Redux/Features/Teacher/ClassSlice";
import ChapterManage from "./ChapterManage";

const SubjectView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClassById(id));
  }, [dispatch, id]);

  const classData = useSelector((state) => state.classData.currentClass);
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (!classData) {
    return <div className="mt-16">loading....</div>;
  }

  const students = classData.students;
  const handleStudentsList = () => {
    navigate("/teacher/class/students", { state: { students } });
  };

  const handleStartLiveClass = () => {
    // Navigate to LiveClass component and pass the classId as state or param
    navigate(`/teacher/live-class/${id}`);
  };

  return (
    <>
      <div className="p-4 mt-24 mx-5 bg-blue-100 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-xl text-center font-bold mb-4">
            {classData.name}
          </h1>
          <div className="flex justify-center items-center mb-5">
            <button
              onClick={handleStudentsList}
              className="ml-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Students List
            </button>
            <button
              onClick={handleStartLiveClass}
              className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Start Live Class
            </button>
          </div>
        </div>

        <div className="subjects mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {classData.subjects.map((subject) => (
            <div
              key={subject._id}
              className="subject-card p-4 bg-orange-200 mx-2 my-2 rounded-xl shadow-md hover:bg-orange-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedSubject(subject)}
            >
              <h3 className="font-semibold mb-1">{subject.subjectName}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedSubject && (
        <ChapterManage classId={id} subject={selectedSubject} />
      )}
    </>
  );
};

export default SubjectView;
