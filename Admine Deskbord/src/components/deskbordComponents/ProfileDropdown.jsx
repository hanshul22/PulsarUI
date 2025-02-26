import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { useUserContext } from '../../services/Context';

const ProfileDropdown = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post("http://localhost:500/api/admins/jwt/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');

    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 z-30 w-48 mt-2 overflow-hidden bg-gray-800 rounded-lg shadow-lg"
    >
      <div className="p-4 border-b border-gray-700">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
      
      <Link to="/profile">
        <motion.div
          whileHover={{ backgroundColor: '#374151' }}
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FaUser className="text-gray-400" />
          <span>View Profile</span>
        </motion.div>
      </Link>

      <motion.button
        onClick={handleLogout}
        whileHover={{ backgroundColor: '#374151' }}
        className="flex items-center w-full gap-3 px-4 py-2 hover:bg-gray-700"
      >
        <FaSignOutAlt className="text-gray-400" />
        <span>Logout</span>
      </motion.button>
    </motion.div>
  );
};

export default ProfileDropdown;