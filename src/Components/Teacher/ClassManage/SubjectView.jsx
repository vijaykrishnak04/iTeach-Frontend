import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClassById } from "../../../Redux/Features/Teacher/classSlice"; // Adjust the path according to your directory structure
import ChapterManage from "./ChapterManage";

const SubjectView = () => {
  const { id } = useParams(); // This is your classId
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassById(id));
  }, [dispatch, id]);

  const classData = useSelector((state) => state.classData.currentClass);
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (!classData) {
    return <div className="mt-16">loading....</div>;
  }

  return (
    <>
      <div className="p-4 mt-24 mx-5 bg-blue-100 rounded-xl">
        <h1 className="text-xl font-bold mb-4">{classData.name}</h1>
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
