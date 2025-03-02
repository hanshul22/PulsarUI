import React from 'react';
import { motion } from 'framer-motion';

const ProfileForm = ({ profile, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* If you want to add image URL input, uncomment the following block */}
      {/* <div>
        <label className="block mb-1 text-sm font-medium">Profile Image URL</label>
        <input
          type="text"
          name="image"
          value={profile.image}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div> */}

      <div>
        <label className="block mb-1 text-sm font-medium">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={profile.currentPassword}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={profile.newPassword}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Confirm New Password</label>
        <input
          type="password"
          name="newPassword"
          value={profile.newPassword}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </motion.button>
    </form>
  );
};

export default ProfileForm;