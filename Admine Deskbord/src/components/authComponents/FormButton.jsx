import { motion } from 'framer-motion';

const FormButton = ({ children, type = 'submit' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
        font-semibold button-glow hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
    >
      {children}
    </motion.button>
  );
};

export default FormButton;