import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubjectView = () => {
  const classData = useSelector((state) => state.enrollmentData.enrolledClass);
  const navigate = useNavigate()

  if (!classData) {
    return <div className="mt-16">loading....</div>;
  }

  const handleSubjectView = (subject) => {
    navigate("/student/class/subject", { state: { subject } });
  };

  return (
    <>
      <div className="sm:p-4 md:p-6 mx-2 sm:mx-5 bg-blue-100 rounded-xl">
        <h1 className="text-base sm:text-lg md:text-xl font-bold mb-4">
          {classData.name}
        </h1>
        <div className="subjects sm:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
          {classData.subjects.map((subject) => (
            <div
              key={subject._id}
              className="subject-card p-2 sm:p-4 bg-orange-200 mx-1 sm:mx-2 my-1 sm:my-2 rounded-xl shadow-md hover:bg-orange-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleSubjectView(subject)}
            >
              <h3 className="text-sm sm:text-base md:text-base text-justify font-semibold mb-1">
                {subject.subjectName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubjectView;
