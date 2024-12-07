import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import useSendMessage from "../hooks/useSendMessage";

const ChatInput = () => {
  const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
  const [showEmoji, setShowEmoji] = useState(false);


  const handleSubmit =async(e) => {
    e.preventDefault();
    if (!message) return;
		await sendMessage(message);
		setMessage("");
  };

  return (
    <div className="border-t p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="h-6 w-6 text-gray-500" />
          </motion.button>
          
          <AnimatePresence>
            {showEmoji && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-12 left-0 z-50"
              >
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setMessage((prev) => prev + emojiData.emoji);
                    setShowEmoji(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          {loading ? <div className='loading loading-spinner'></div> : <Send className="h-5 w-5" />}
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;