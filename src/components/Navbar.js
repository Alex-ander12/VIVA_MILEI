import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

const Navbar = () => {
  const user = getCurrentUser();

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md p-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Bienvenido, {user?.username}</h2>
      </div>
      <div className="flex items-center gap-4">
        <motion.button whileHover={{ scale: 1.1 }} className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </motion.button>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">{user?.role}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;