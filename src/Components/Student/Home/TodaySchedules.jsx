import {
  faCalendar,
  faHourglassStart,
  faPeopleGroup,
  faSpinner,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTodaySchedulesApi } from "../../../Services/Student";
import { useSelector } from "react-redux";

const TodaySchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classId = useSelector(
    (state) => state.enrollmentData?.enrolledClass?._id
  );
  useEffect(() => {
    if (classId) {
      setIsLoading(true);
      const headers = {
        Authorization: localStorage.getItem("studentToken"),
      };
      getTodaySchedulesApi(classId, headers)
        .then((reponse) => {
          setSchedules(reponse.data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [classId]);
  return (
    <>
      <h1 className="text-lg font-bold mb-3">Upcoming Schedules</h1>
      {isLoading ? (
        <div className="flex justify-center text-3xl font-thin">
          <FontAwesomeIcon icon={faSpinner} spin />{" "}
        </div> // This is where your loading animation will go
      ) : (
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          {schedules.map((schedule) => (
            <div
              className="bg-white p-4 border-l-4 flex flex-row justify-evenly border-amber-300 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              key={schedule._id}
            >
              <div className="text-2xl flex items-center mr-2">
                {schedule.type === "live" ? (
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    className="text-blue-500"
                  />
                ) : (
                  <FontAwesomeIcon icon={faVideo} className="text-red-500" />
                )}
              </div>
              <div className="w-full">
                <h3 className="text-sm font-semibold mb-1">
                  {schedule?.class?.subjectName} {`|`} {schedule.title}{" "}
                </h3>
                <p className="text-xs font-medium mb-1">
                  {schedule.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <FontAwesomeIcon icon={faCalendar} size="xs" />
                    <span className="ml-1">
                      {new Date(schedule.time).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faHourglassStart} size="xs" />
                    <span className="ml-1">
                      {new Date(schedule.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <a
                  href={schedule.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Join Google Meet
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TodaySchedules;
