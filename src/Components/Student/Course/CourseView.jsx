import ReactPlayer from "react-player";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../Redux/Features/Student/CoursesSlice";
import { useDispatch, useSelector } from "react-redux";

const CourseView = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const course = useSelector((state) => state.courseData.currentCourse);
  const { id } = useParams();
  const dispatch = useDispatch();

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    dispatch(getCourseById(id));
    setIsLoading(false);
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen p-4 mt-24 m-5 bg-slate-100 rounded-xl">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 mt-24 sm:mt-24 m-3 sm:m-5 bg-slate-100 rounded-xl">
      <h1 className="text-xl font-bold mb-4">{course?.title}</h1>
      <div className="lessons m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {course?.lessons?.map((lesson) => {
          const videoId = lesson?.videoURL.split("/").pop().split("?")[0];
          const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`;

          return (
            <div
              className="lesson-card p-4 bg-orange-200 m-2 rounded-xl shadow-md hover:bg-orange-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => openModal(lesson)}
              key={lesson?._id}
            >
              <img
                src={thumbnailURL}
                alt="Thumbnail"
                className="rounded w-full max-w-sm"
              />
              <h3 className="font-semibold text-sm sm:text-base mb-1">
                {lesson?.lessonTitle}
              </h3>
              <p className="text-xs">{lesson?.lessonDescription}</p>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        style={{ overlay: { zIndex: 1000 } }}
      >
        <div className="relative bg-white rounded-xl shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">
            {selectedLesson?.lessonTitle}
          </h2>

          <ReactPlayer
            className="rounded"
            url={selectedLesson?.videoURL}
            controls
            width="100%"
          />

          <div className="mt-4 flex flex-row justify-between items-center">
            <a
              href={selectedLesson?.pdfNotes?.url}
              download
              className={`${
                selectedLesson?.pdfNotes?.url ? "" : "hidden"
              } text-blue-600 hover:underline mb-2 sm:mb-0`}
            >
              <button
                hidden={!selectedLesson?.pdfNotes?.url}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Get PDF Notes
              </button>
            </a>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseView;
