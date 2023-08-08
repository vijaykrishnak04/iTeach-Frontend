/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const AddLessonModal = ({
  isOpen,
  onClose,
  saveLesson,
  editLessonIndex,
  lessonToEdit,
}) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [, setPdfNotes] = useState(null);

  useEffect(() => {
    if (lessonToEdit) {
      setLessonTitle(lessonToEdit.lessonTitle);
      setVideoURL(lessonToEdit.videoURL);
      setLessonDescription(lessonToEdit.lessonDescription);
    } else {
      setLessonTitle("");
      setVideoURL("");
      setLessonDescription("");
      setPdfNotes(null);
    }
  }, [lessonToEdit]);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfNotes(file);
    }
  };

  const clearState = () => {
    setLessonTitle("");
    setVideoURL("");
    setLessonDescription("");
    setPdfNotes(null);
  };

  const handleSubmit = () => {
    const lesson = {
      lessonTitle,
      videoURL,
      lessonDescription,
      pdfNotes: null, // update this if you integrate file upload later
    };
    saveLesson(lesson);
    clearState(); // Clearing the state after the lesson is added/updated
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-2xl w-full max-w-lg mx-auto">
        <button
          onClick={onClose}
          className="float-right p-1 hover:bg-gray-200 bg-white rounded-full"
        >
          &#10005; {/* This is the "X" close icon */}
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Add a Lesson
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Lesson Title:
          </label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Video URL:
          </label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Lesson Description:
          </label>
          <textarea
            className="p-2 border rounded w-full"
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white w-4/5">
            PDF Notes:
          </label>
          <input
            type="file"
            className="text-white"
            onChange={handlePdfChange}
            accept=".pdf"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          {editLessonIndex !== null ? "Update Lesson" : "Add Lesson"}
        </button>
      </div>
    </div>
  );
};

export default AddLessonModal;
