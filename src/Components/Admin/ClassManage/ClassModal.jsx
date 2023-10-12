/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";

const ClassModal = ({ isOpen, onClose, onSave, currentSyllabus }) => {
  const isEditing = Boolean(currentSyllabus);
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");
  const [price, setPrice] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(""); // Temporary state for the input
  const [thumbnail, setThumbnail] = useState(null); // Stores File object
  const [preview, setPreview] = useState(""); // Stores the URL for preview
  const [errors, setErrors] = useState({});

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);

      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
    }
  };
  useEffect(() => {
    setName(currentSyllabus ? currentSyllabus.name : "");
    setSubjects(
      currentSyllabus ? currentSyllabus.subjects.map((subject) => subject) : ""
    );
    setDesciption(currentSyllabus ? currentSyllabus.description : "");
    setThumbnail(null);
    setPreview(currentSyllabus ? currentSyllabus?.thumbnail?.url : "");
    setPrice(currentSyllabus ? currentSyllabus.price : ""); // Update the price here
  }, [currentSyllabus]);

  const resetForm = () => {
    setName("");
    setThumbnail(null);
    setDesciption("");
    setSubjects([]);
    setSubject("");
    setPrice("");
  };

  const handleSave = async () => {
    let errors = {};

    if (thumbnail === null) {
      errors.thumbnail = "Thumbnail is required";
    }
    if (validator.isEmpty(name)) {
      errors.name = "Name is required";
    }

    if (validator.isEmpty(price)) {
      errors.price = "Price is required";
    }

    if (validator.isEmpty(description)) {
      errors.description = "Description is required";
    }

    if (subjects.length === 0) {
      errors.subject = "At least one subject is required";
    }

    const uniqueSubjects = [...new Set(subjects)];
    if (uniqueSubjects.length !== subjects.length) {
      errors.subject = "Duplicate subjects provided"
    }

    if (Object.keys(errors).length === 0) {
      // Save the syllabus data
      onSave({
        name,
        price: parseFloat(price),
        subjects:
          subjects instanceof Array
            ? subjects
            : subjects.split(",").map((subject) => subject.trim()), // Handling subjects as both array and comma-separated string
        description,
        thumbnail,
      });
      resetForm();
      onClose();
    } else {
      console.log(errors);
      setErrors(errors);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
    setErrors({});
  };

  return (
    <Modal
      title={isEditing ? "Edit Syllabus" : "Add Syllabus"} // Title based on mode
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      className="text-center"
    >
      <div className="p-4">
        <div className="mb-4">
          <label
            className="block text-start text-gray-700 text-sm font-bold mb-2"
            htmlFor="thumbnail"
          >
            Thumbnail
          </label>
          <Input
            className={`w-full p-2 ${
              errors.thumbnail
                ? "border-red-600 shadow-sm shadow-red-300"
                : "border"
            } rounded`}
            required
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-start text-sm my-1">
              {errors.thumbnail}
            </p>
          )}
          {preview && <img src={preview} alt="Preview" className="mt-4 h-32" />}
        </div>
        <div className="mb-4 ">
          <label
            className="block text-start text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name of Syllabus
          </label>
          <Input
            className={`w-full p-2 ${
              errors.name ? "border-red-600 shadow-sm shadow-red-300" : "border"
            } rounded`}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter syllabus name..."
          />
          {errors.name && (
            <p className="text-red-500 text-start text-sm my-1">
              {errors.name}
            </p>
          )}
        </div>
        <div className="mb-4 ">
          <label
            className="block text-start text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Description
          </label>
          <Input
            className={`w-full p-2 ${
              errors.description
                ? "border-red-600 shadow-sm shadow-red-300"
                : "border"
            } rounded`}
            type="text"
            id="name"
            value={description}
            onChange={(e) => setDesciption(e.target.value)}
            placeholder="Enter syllabus description..."
          />
          {errors.description && (
            <p className="text-red-500 text-start text-sm my-1">
              {errors.description}
            </p>
          )}
        </div>
        <div className="mb-4 ">
          <label
            className="block text-start text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price to Enroll
          </label>
          <Input
            className={`w-full p-2 ${
              errors.price
                ? "border-red-600 shadow-sm shadow-red-300"
                : "border"
            } rounded`}
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price..."
          />
          {errors.price && (
            <p className="text-red-500 text-start text-sm my-1">
              {errors.price}
            </p>
          )}
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mr-2"
            htmlFor="subjects"
          >
            Subjects
          </label>
          <div className="flex w-full">
            <Input
              className={`w-full mr-2 ${
                errors.subject
                  ? "border-red-600 shadow-sm shadow-red-300"
                  : "border"
              } rounded`}
              type="text"
              id="subject"
              value={subject}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSubjects([...subjects, subject]);
                  setSubject("");
                }
              }}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter a subject..."
            />

            <Button
              type="primary"
              onClick={() => {
                setSubjects([...subjects, subject]);
                setSubject("");
              }}
              className="bg-blue-500 hover:bg-blue-700 rounded"
            >
              <FontAwesomeIcon icon={faPlus} /> {/* FontAwesome icon here */}
            </Button>
          </div>
        </div>
        {errors.subject && (
          <p className="text-red-500 text-start text-sm my-1">
            {errors.subject}
          </p>
        )}
        <div className="mt-4 flex flex-wrap">
          {subjects instanceof Array
            ? subjects.map((sub, index) => (
                <div
                  key={index}
                  className="inline-block p-2 m-2 border rounded bg-gray-100"
                >
                  {sub.subjectName ? sub.subjectName : sub}{" "}
                  <Button
                    onClick={() => {
                      const updatedSubjects = subjects.filter(
                        (_, i) => i !== index
                      );
                      setSubjects(updatedSubjects);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    x
                  </Button>
                </div>
              ))
            : subjects}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
          >
            {currentSyllabus ? "Edit" : "Add"} Syllabus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClassModal;
