/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const ChapterManage = ({ classId, subject }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const navigate = useNavigate();

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddChapter = () => {
    navigate("/teacher/class/add-chapter", { state: { classId, subject } });
  };

  const handleEditChapter = (chapter) => {
    navigate("/teacher/class/edit-chapter", {
      state: { classId, subject, chapter },
    });
  };

  return (
    <div className="p-4 mt-5 m-5 bg-blue-100 rounded-xl">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold mb-0">{subject.subjectName}</p>
        <button
          className="ml-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAddChapter}
        >
          Add Chapter
        </button>
      </div>

      {subject.chapters.map((chapter) => (
        <div key={chapter._id} className="mb-5 bg-orange-50 rounded-md p-3">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold mb-3">
              {chapter.chapterTitle}
            </h2>
            <button
              className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleEditChapter(chapter)}
            >
              Edit Chapter
            </button>
          </div>
          <div className="lessons m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* grid adjusted for responsiveness */}
            {chapter.lessons.map((lesson) => {
              const videoId = lesson.videoURL.split("/").pop().split("?")[0];
              const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`;
              console.log(videoId);

              return (
                <div
                  className="lesson-card p-4 bg-orange-200 m-2 rounded-xl shadow-md hover:bg-orange-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  onClick={() => openModal(lesson)}
                  key={lesson._id}
                >
                  <img
                    src={thumbnailURL}
                    alt="Thumbnail"
                    className="rounded w-full"
                  />
                  <h3 className="font-semibold mb-1">{lesson.lessonTitle}</h3>
                  <p className="text-xs">{lesson.lessonDescription}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        style={{ overlay: { zIndex: 1000 } }}
      >
        <div className="relative bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">
            {selectedLesson?.lessonTitle}
          </h2>
          <ReactPlayer
            className="rounded"
            url={selectedLesson?.videoURL}
            controls
          />
          <div className="mt-4 flex justify-between items-center">
            <a
              href={selectedLesson?.pdfNotes.url}
              download
              className="text-blue-600 hover:underline"
            >
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
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

export default ChapterManage;
