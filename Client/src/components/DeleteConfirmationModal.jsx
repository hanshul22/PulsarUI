import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiErrorWarningLine } from 'react-icons/ri';

const DeleteConfirmationModal = ({ title, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md p-6 glass-effect rounded-lg m-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-500/20">
                <RiErrorWarningLine size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-space-text">Confirm Deletion</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-space-light rounded-lg transition-colors"
            >
              <RiCloseLine size={24} />
            </button>
          </div>
          
          <p className="mb-6 text-space-text/80">
            Are you sure you want to delete "<span className="font-semibold">{title}</span>"? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-space-light transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;