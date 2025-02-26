import { motion } from 'framer-motion';

const MenuCheckbox = ({ isOpen, onToggle }) => {
  return (
    <motion.label
      className="cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <input 
        type="checkbox" 
        className="hidden" 
        checked={isOpen}
        onChange={onToggle}
      />
      <svg 
        viewBox="0 0 32 32"
        className="h-8 transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpen ? 'rotate(-45deg)' : 'none'
        }}
      >
        <path
          className="line line-top-bottom transition-[stroke-dasharray,stroke-dashoffset] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 3,
            strokeDasharray: isOpen ? '20 300' : '12 63',
            strokeDashoffset: isOpen ? '-32.42' : '0'
          }}
        />
        <path
          className="line transition-[stroke-dasharray,stroke-dashoffset] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
          d="M7 16 27 16"
          style={{
            fill: 'none',
            stroke: 'currentColor',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 3
          }}
        />
      </svg>
    </motion.label>
  );
};

export default MenuCheckbox;