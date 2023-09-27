/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ExamResult = ({ exam }) => {
  const [groupedExams, setGroupedExams] = useState({});
  const [openSubject, setOpenSubject] = useState(null); // New state variable

  useEffect(() => {
    let groups = {};

    if (exam) {
      exam.forEach((examDetail) => {
        if (!groups[examDetail.SubjectName]) {
          groups[examDetail.SubjectName] = [];
        }

        groups[examDetail.SubjectName].push(examDetail);
      });
    }

    setGroupedExams(groups);
  }, [exam]);

  // Toggle function
  const toggleSubject = (subject) => {
    if (openSubject === subject) {
      setOpenSubject(null);
    } else {
      setOpenSubject(subject);
    }
  };

  return (
    <>
      <p className="text-2xl font-semibold mb-4">Exam results</p>

      {Object.keys(groupedExams).length > 0 ? (
        Object.keys(groupedExams).map((subject) => (
          <div key={subject} className="mt-4">
            <h2
              className="text-xl font-bold mb-3 text-start"
              onClick={() => toggleSubject(subject)}
            >
              {subject}
              {/* Arrow icon logic */}
              {openSubject === subject ? "🔺" : "🔻"}
            </h2>
            {/* Conditional rendering of exam details */}
            {openSubject === subject &&
              groupedExams[subject].map((examDetail, index) => {
                let percentage =
                  (parseFloat(examDetail.marks.split("/")[0]) /
                    parseFloat(examDetail.marks.split("/")[1])) *
                  100;
                percentage = percentage.toFixed(1);

                return (
                  <div
                    key={index}
                    className="w-full bg-white p-4 mt-2 rounded shadow-md border border-gray-200"
                  >
                    <h3 className="font-bold text-lg mb-2">
                      {examDetail.name}
                    </h3>
                    <div className="relative pt-1">
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-gray-600">
                            Marks: {examDetail.marks}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-gray-600">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div
                          style={{ width: `${percentage}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))
      ) : (
        <p className="mt-4">No exams found.</p>
      )}
    </>
  );
};

export default ExamResult;
