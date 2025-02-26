import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CodeCard = ({ code }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <img
          src={code.image}
          alt={code.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{code.title}</h3>
        {/* <p className="text-gray-400 mb-4">{code.description}</p> */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {code.name}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/code/${code._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Code
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeCard;