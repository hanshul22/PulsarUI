import React, { useEffect } from 'react';

const DeleteConfirmationModal = ({ title, onClose, onConfirm }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay">
      <div className="p-6 text-white bg-gray-800 rounded-lg modal-content w-96">
        <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete <span className="font-semibold">{title}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
