import { useEffect, useState } from "react";
import { getSchedulesApi } from "../../../Services/Student";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";

const ViewSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateDisplayIndex, setDateDisplayIndex] = useState(0);
  const scheduleIds = useSelector(
    (state) => state.enrollmentData?.enrolledClass?.schedules
  );

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("studentToken"),
    };

    getSchedulesApi(scheduleIds, headers).then((response) => {
      const sortedSchedules = response.data.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );
      setSchedules(sortedSchedules);
    });
  }, [scheduleIds]);

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
      <p className="text-2xl m-6 flex items-center justify-start font-semibold">
        Schedules <FontAwesomeIcon icon={faCalendar} className="ml-2" />
      </p>
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
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {filteredSchedules.map((schedule) => (
          <div
            className="bg-gray-100 p-6 border-l-8 border-amber-300 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            key={schedule._id}
          >
            <h3 className="text-xl mb-2">
              {schedule?.class?.subjectName} {`|`} {schedule.title}{" "}
            </h3>
            <p className="mb-2">{schedule.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <FontAwesomeIcon icon={faCalendar} />
                <span className="ml-2">
                  {new Date(schedule.time).toLocaleDateString()}
                </span>
              </div>
              <div>
                <FontAwesomeIcon icon={faHourglassStart} />
                <span className="ml-2">
                  {new Date(schedule.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSchedules;
