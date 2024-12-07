import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import ChatList from '../../chat/ChatList';
import { getRandomEmoji } from "../../utils/emojis";
import useGetConversations from '../../hooks/useGetConversations.';

const SideBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const { loading, conversations } = useGetConversations(); // Fetching conversations


  return (
    <div className="w-80 border-r bg-white h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation, idx) => (
				<ChatList
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
      </div>
    </div>
  );
};

export default SideBar;