import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import SideBar from '../components/layout/SideBar';
import ChatInput from '../chat/chatInput';
import MessageList from '../chat/MessageList';


const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col bg-gray-50"
    >
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content with Sidebar and Chat Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className=" bg-white border-r overflow-y-auto">
          <SideBar />
        </aside>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 ">
            <MessageList />
          </div>

          {/* Chat Input */}
          <div className="sticky bottom-0 bg-white border-t">
            <ChatInput />
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;
