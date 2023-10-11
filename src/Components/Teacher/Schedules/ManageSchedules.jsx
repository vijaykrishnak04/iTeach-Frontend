import { Modal, message } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addScheduleApi,
  deleteScheduleApi,
  getSchedulesApi,
} from "../../../Services/Teacher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faCalendar,
  faHourglassStart,
  faPeopleGroup,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
// Import your Redux actions here
// import { fetchClasses, fetchSchedules, createSchedule, deleteSchedule } from './path-to-your-actions';

const ManageSchedules = () => {
  const [selectedClassAndSubject, setSelectedClassAndSubject] = useState({
    classId: "",
    className: "",
    subjectId: "",
    subjectName: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [classType, setClassType] = useState("live");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const classNames = [
    ...new Set(schedules.map((schedule) => schedule.class.className)),
  ];
  const subjectNames = [
    ...new Set(schedules.map((schedule) => schedule.class.subjectName)),
  ];

  const validateForm = () => {
    let errors = {};

    if (!selectedClassAndSubject.classId) {
      errors.classId = "Class is required!";
    }

    if (!selectedClassAndSubject.subjectId) {
      errors.subjectId = "Subject is required!";
    }

    if (!title.trim()) {
      errors.title = "Title is required!";
    }

    if (!description.trim()) {
      errors.description = "Description is required!";
    }

    if (!link.trim()) {
      errors.link = "Link is required!";
    }

    if (!time) {
      errors.time = "Time is required!";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getDates = (daysToGoBack, daysToGoForward) => {
    const dates = [];
    for (let i = -daysToGoBack; i <= daysToGoForward; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const datesForSlider = getDates(3, 3); // 3 days before and after today
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startSlideIndex, setStartSlideIndex] = useState(3); // Display the 4th (center) item first

  const slideDates = (direction) => {
    if (direction === "left" && startSlideIndex > 3) {
      setStartSlideIndex(startSlideIndex - 1);
    }
    if (direction === "right" && startSlideIndex < datesForSlider.length - 4) {
      setStartSlideIndex(startSlideIndex + 1);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedClassAndSubject({
      classId: "",
      className: "",
      subjectId: "",
      subjectName: "",
    });
    setTitle("");
    setDescription("");
    setTime("");
    setClassType("live");
    setFormErrors({});
    setIsModalVisible(false);
    setLink("");
  };

  // Fetching classes and schedules from the Redux store
  const classes = useSelector((state) => state.classData.classList);

  const getFormattedDate = (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      date: date.getDate(),
      month: monthNames[date.getMonth()],
      day: dayNames[date.getDay()],
    };
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // pad with '0' to get 2 digits
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.time.startsWith(selectedDate)
  );

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("teacherToken"),
    };
    getSchedulesApi(headers).then((response) => setSchedules(response.data));
  }, []);

  const handleClassChange = (e) => {
    const selectedId = e.target.value;
    const selectedClassObj = classes.find((cls) => cls._id === selectedId);

    setSelectedClassAndSubject({
      classId: selectedId,
      className: selectedClassObj.name,
      subjectId: "",
      subjectName: "",
    });
  };

  const handleSubjectChange = (e) => {
    const selectedId = e.target.value;
    const selectedClassObj = classes.find(
      (cls) => cls._id === selectedClassAndSubject.classId
    );

    // Return early if the class or its subjects are not found
    if (!selectedClassObj || !selectedClassObj.subjects) return;

    const selectedSubjectObj = selectedClassObj.subjects.find(
      (sub) => sub._id === selectedId
    );
    // It's good practice to check for the existence of the selected subject as well
    if (!selectedSubjectObj) return;

    setSelectedClassAndSubject((prevState) => ({
      ...prevState,
      subjectId: selectedId,
      subjectName: selectedSubjectObj.subjectName,
    }));
  };

  const handleSubmit = () => {
    const headers = {
      Authorization: localStorage.getItem("teacherToken"),
    };
    if (!validateForm()) {
      return;
    }
    const schedule = {
      selectedClassAndSubject,
      title,
      description,
      time,
      link,
      classType,
    };
    handleCancel();
    addScheduleApi(schedule, headers).then((response) =>
      setSchedules((prevschedules) => [...prevschedules, response.data])
    );
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const headers = {
            Authorization: localStorage.getItem("teacherToken"),
          };
          const response = await deleteScheduleApi(id, headers);
          setSchedules((prevschedules) => [
            ...prevschedules.filter(
              (schedule) => schedule._id !== response.data
            ),
          ]);
        } catch (err) {
          message.error("Error occurred while deleting, try again later!");
        }
      },
      onCancel: () => {
        console.log("Delete action was cancelled");
      },
    });
  };

  const classAndSubjectFilteredSchedules = filteredSchedules.filter(
    (schedule) => {
      return (
        (classFilter === "" || schedule?.class?.className === classFilter) &&
        (subjectFilter === "" || schedule?.class?.subjectName === subjectFilter)
      );
    }
  );

  return (
    <div className="mt-28 px-4 md:px-0 mx-2 md:mx-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Manage Schedules
        </h2>
        <button
          onClick={showModal}
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus-circle mr-2"></i> Create New Schedule
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center mb-6">
        <button
          onClick={() => slideDates("left")}
          className="bg-gray-200 p-2 md:p-4 rounded-l-md hover:bg-gray-300"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        {datesForSlider
          .slice(startSlideIndex - 3, startSlideIndex + 4)
          .map((date) => {
            const formattedDate = getFormattedDate(date);
            return (
              <button
                key={date.toISOString()}
                className={`flex flex-col items-center p-4 mx-1 ${
                  date.toISOString().split("T")[0] === selectedDate
                    ? "bg-yellow-400 text-white rounded-md"
                    : "bg-yellow-100 hover:bg-yellow-200 rounded-md"
                }`}
                onClick={() =>
                  setSelectedDate(date.toISOString().split("T")[0])
                }
              >
                <span className="text-xs font-medium">
                  {formattedDate.month}
                </span>
                <span className="text-lg">{formattedDate.date}</span>
                <span className="text-xs">{formattedDate.day}</span>
              </button>
            );
          })}

        <button
          onClick={() => slideDates("right")}
          className="bg-gray-200 p-2 md:p-4 rounded-r-md hover:bg-gray-300"
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>

      <div className="mb-4">
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="mr-4"
        >
          <option value="">All Classes</option>
          {classNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjectNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Modal
        title="Create New Schedule"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col space-y-4">
          <select
            value={selectedClassAndSubject.classId}
            onChange={handleClassChange}
            className="py-2 px-4 rounded bg-gray-200"
          >
            <option value="" disabled>
              Select Class
            </option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          {formErrors.classId && (
            <p className="text-red-500 mt-1">{formErrors.classId}</p>
          )}
          <select
            className={`py-2 px-4 rounded bg-gray-200`}
            value={selectedClassAndSubject.subjectId}
            onChange={handleSubjectChange}
          >
            <option value="" disabled>
              Select subject
            </option>
            {selectedClassAndSubject && selectedClassAndSubject.classId
              ? classes
                  .find((cls) => cls._id === selectedClassAndSubject.classId)
                  .subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.subjectName}
                    </option>
                  ))
              : null}
          </select>
          {formErrors.subjectId && (
            <p className="text-red-500 mt-1">{formErrors.subjectId}</p>
          )}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-2 px-4 rounded bg-gray-200"
          />
          {formErrors.title && (
            <p className="text-red-500 mt-1">{formErrors.title}</p>
          )}

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-4 rounded bg-gray-200"
          />

          {formErrors.description && (
            <p className="text-red-500 mt-1">{formErrors.description}</p>
          )}

          <input
            type="datetime-local"
            min={getMinDateTime()}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="py-2 px-4 rounded bg-gray-200"
          />

          {formErrors.time && (
            <p className="text-red-500 mt-1">{formErrors.time}</p>
          )}

          <input
            type="text"
            placeholder="Google meet link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="py-2 px-4 rounded bg-gray-200"
          />
          {formErrors.link && (
            <p className="text-red-500 mt-1">{formErrors.link}</p>
          )}

          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Schedule
          </button>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classAndSubjectFilteredSchedules.map((schedule) => (
          <div
            key={schedule._id}
            className="bg-white border-l-4 flex flex-row border-blue-500 shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="text-2xl flex items-center mr-4">
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
                {schedule?.class?.className} | {schedule?.class?.subjectName}{" "}
                {`|`} {schedule.title}{" "}
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
            <div className="">
              <button
                className="bg-red-600 text-white rounded-full py-1 px-3 hover:bg-red-700 flex items-center text-sm"
                onClick={() => {
                  handleDelete(schedule._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSchedules;
