import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-6">Welcome to Lego UI</h2>
      <div className="grid gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">About Our Platform</h3>
          <p className="text-gray-300">
            Lego UI is a comprehensive platform for developers to share and discover
            reusable code components. Our mission is to make web development more
            efficient and collaborative.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Component Library</li>
              <li>Code Sharing</li>
              <li>User Collaboration</li>
              <li>Version Control</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold text-blue-500">1,234</p>
                <p className="text-gray-400">Total Components</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500">567</p>
                <p className="text-gray-400">Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Dashboard;