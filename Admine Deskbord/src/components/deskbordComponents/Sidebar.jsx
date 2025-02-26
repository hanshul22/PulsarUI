import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaTimes } from 'react-icons/fa';
import { RiUploadCloudFill } from "react-icons/ri";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const menuItems = [
    { path: '/code-upload', icon: <RiUploadCloudFill />, label: 'Upload Code' },
    { path: '/admin-codes', icon: <FaCode />, label: 'Admin Codes' },
    { path: '/user-codes', icon: <FaCode />, label: 'User Codes' },
    { path: '', icon: <FaUsers />, label: 'All Users' },
  ];

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      className="fixed top-0 left-0 z-50 w-64 h-full p-4 text-white bg-gray-900 shadow-lg"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Menu</h2>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          <FaTimes size={20} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-full p-3 mt-auto space-x-3 rounded-lg hover:bg-gray-800"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </motion.button> */}
      </div>
    </motion.div>
  );
};

export default Sidebar;