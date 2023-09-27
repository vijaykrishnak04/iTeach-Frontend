import { faCalendar, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TodaySchedules = () => {
    
  return (
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
  );
};

export default TodaySchedules;
