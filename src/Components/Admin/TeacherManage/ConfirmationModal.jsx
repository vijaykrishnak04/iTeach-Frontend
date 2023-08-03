// eslint-disable-next-line react/prop-types
const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-md p-6 w-80">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
