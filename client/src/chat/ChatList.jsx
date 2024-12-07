import React, { memo } from "react";
import { motion } from "framer-motion";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const ChatList = memo(({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <motion.div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-3 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-16 rounded-full">
              <img
                src={
                  conversation.gender === "male"
                    ? "https://avatar.iran.liara.run/public/boy"
                    : "https://avatar.iran.liara.run/public/girl"
                }
                alt="user avatar"
              />
            </div>
          </div>
          {isOnline && (
            <motion.span
              className="absolute bottom-1 right-1 bg-green-500 border-white border-2 w-3 h-3 rounded-full"
              variants={{
                pulse: {
                  scale: [0.8, 1.2],
                  transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" },
                },
              }}
              animate="pulse"
            />
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black ml-3">{conversation.username}</p>
            <span className="text-xl ml-20">{emoji}</span>
          </div>
        </div>
      </motion.div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
});

export default ChatList;
