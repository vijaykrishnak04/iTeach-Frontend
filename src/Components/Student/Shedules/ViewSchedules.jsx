import { useEffect, useState } from "react";
import { getSchedulesApi } from "../../../Services/Student";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faHourglassStart,
  faPeopleGroup,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const ViewSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateDisplayIndex, setDateDisplayIndex] = useState(0);
  const classId = useSelector(
    (state) => state.enrollmentData?.enrolledClass?._id
  );

  useEffect(() => {
    if (classId) {
      const headers = {
        Authorization: localStorage.getItem("studentToken"),
      };
      getSchedulesApi(classId, headers).then((response) => {
        const sortedSchedules = response.data.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        );
        setSchedules(sortedSchedules);
      });
    }
  }, [classId]);

  const generateDateOptions = () => {
    if (!schedules.length) return [];

    const startDate = new Date(schedules[0].time);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(schedules[schedules.length - 1].time);
    endDate.setHours(0, 0, 0, 0);

    const dateOptions = [];

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      d.setHours(0, 0, 0, 0);
      dateOptions.push(new Date(d));
    }

    console.log("all dates between start date and enddate", dateOptions);
    return dateOptions;
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      new Date(schedule.time).toDateString() === selectedDate.toDateString()
  );

  const allDateOptions = generateDateOptions();
  const showDateOptions = allDateOptions.slice(
    allDateOptions.length - 7,
    allDateOptions.length
  );

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setDateDisplayIndex(dateDisplayIndex - 1);
    } else {
      setDateDisplayIndex(dateDisplayIndex + 1);
    }
  };

  return (
    <div className="mt-20 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Schedules</h1>
          <p className="text-xl text-gray-600">View schedules</p>
        </div>
      </div>
      <div className="flex justify-center items-center mb-6">
        {true && (
          <button
            onClick={() => handleArrowClick("left")}
            className="bg-gray-200 p-4 rounded-l-md hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}

        {showDateOptions.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`flex flex-col items-center p-4 mx-1 ${
              new Date(date).toDateString() ===
              new Date(selectedDate).toDateString()
                ? "bg-yellow-400 text-white rounded-md"
                : "bg-yellow-100 hover:bg-yellow-200 rounded-md"
            }`}
          >
            <span className="text-xs font-medium">
              {date.toLocaleString("default", { month: "short" })}
            </span>
            <span className="text-lg">{date.getDate()}</span>
            <span className="text-xs">
              {date.toLocaleString("default", { weekday: "short" })}
            </span>
          </button>
        ))}

        {true && (
          <button
            onClick={() => handleArrowClick("right")}
            className="bg-gray-200 p-4 rounded-r-md hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSchedules.map((schedule) => (
          <div
            key={schedule._id}
            className="bg-white p-4 border-l-4 flex flex-row border-amber-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
              <p className="text-xs font-medium mb-1">{schedule.description}</p>
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
    </div>
  );
};

export default ViewSchedules;
