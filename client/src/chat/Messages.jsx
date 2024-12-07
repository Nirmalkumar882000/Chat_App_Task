import React from 'react';
import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";
import useConversation from "../zustand/useConversation";

const Messages = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  
  const fromMe = message.senderId === authUser._id;  
  const formattedTime = extractTime(message.createdAt);
  
  const chatClassName = fromMe ? "chat-end justify-end" : "chat-start justify-start";
  const bubbleBgColor = fromMe ? "bg-blue-100 text-black" : "bg-gray-100 text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName} flex items-start gap-3 mb-4`}>
      <div className={`chat-bubble ${bubbleBgColor} p-3 rounded-lg max-w-[70%] ${shakeClass}`}>
        <div className="font-semibold">{message.sender}</div>
        <div className="text-sm">{message.message}</div>
        <div className="text-xs text-gray-500 mt-1 text-right">{formattedTime}</div>
      </div>
    </div>
  );
};

export default Messages;
