import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import Msg from "./Msg";


const MessageList = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.username}</span>
            <Msg/>
					</div>
				</>
			)}
		</div>
  );
};

export default MessageList;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full relative top-20">
      <div className="px-4 text-center text-gray-600 flex flex-col items-center gap-3">
        <p className="text-xl font-semibold">Welcome 👋 {authUser?.username || 'User'} ❄</p>
        <p className="text-md">Select a chat to start messaging</p>
      </div>
    </div>
  );
};
