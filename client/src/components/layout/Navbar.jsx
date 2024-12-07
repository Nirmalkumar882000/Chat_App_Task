import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useLogout from '../../hooks/useLogout';


const Navbar = () => {

  const {loading, logout}= useLogout()

  const handleLogout =async() => {
         await logout()
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-white border-b px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <MessageCircle className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">ChatApp</span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          
          {!loading ?(<LogOut onClick={handleLogout} className="h-6 w-6 text-gray-600" />) 
          :(
            <div className="animate-spin ml-2 h-4 w-4 text-gray-400" />
            )}
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;