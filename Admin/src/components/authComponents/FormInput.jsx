import { motion } from 'framer-motion';

const FormInput = ({ 
  icon: Icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  rightIcon: RightIcon,
  onRightIconClick,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-12 py-3 input-dark text-gray-100 rounded-lg 
          focus:outline-none transition-all duration-300 placeholder-gray-500"
        required
      />
      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
            hover:text-blue-400 transition-colors duration-300"
        >
          <RightIcon />
        </button>
      )}
    </motion.div>
  );
};

export default FormInput;