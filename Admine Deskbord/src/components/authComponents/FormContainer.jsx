import { motion } from 'framer-motion';

const FormContainer = ({ children }) => {
  return (
    <div className="min-h-screen dark-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl 
          border border-slate-800/50">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default FormContainer;