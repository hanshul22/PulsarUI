import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaUser } from 'react-icons/fa';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const user = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  return (
    <nav className="flex items-center justify-between p-4 text-white bg-gray-900">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-800"
      >
        <FaBars size={24} />
      </motion.button>

      <h1 className="text-2xl font-bold font-['Poppins']"><Link to={'/daskboard'}>Admin Dashboard</Link></h1>

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
            <FaUser />
          </div>
        </motion.div>

        {showProfile && <ProfileDropdown user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;