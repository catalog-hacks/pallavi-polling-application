"use client";

import Button from "@/lib/utils/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PollOption {
  option_text: string;
  votes: number;
}

interface Poll {
  creator_id: string;
  id: number;
  options: PollOption[];
  title: string; 
  closed: boolean;
}

interface PollCardProps {
  poll: Poll;
  loggedInUser: boolean;
  totalVotes: number;
  onPollClose: (pollId: number) => void;
}

const PollCard: React.FC<PollCardProps> = ({ poll, loggedInUser, totalVotes,onPollClose  }) => {
  const router = useRouter();
  const [isClosed, setIsClosed] = useState(poll.closed);
  
  const handleClick = () => {
    router.push(`http://localhost:3000/pages/polls/${poll.id}`); 
  };

  const handleClosePoll = async () => {
    const response = await fetch(`/api/polls/${poll.id}/close`, { method: "POST" });
    if (response.ok) {
      setIsClosed(true);
      // onPollClose(poll.id);
    } else {
      console.error("Failed to close the poll");
    }
  };

  const handleResetPoll = async () => {
    const response = await fetch(`/api/polls/${poll.id}/reset`, { method: "POST" });
    if (response.ok) {
      console.log("Poll reset successfully");
    } else {
      console.error("Failed to reset the poll");
    }
  };

  return (
    <div 
        className={`bg-gray-900 font-mono text-white p-3 relative flex flex-col w-96 justify-between text-center rounded-xl ${isClosed ? 'opacity-50 disabled:*' : ''}`}
        
    >
      <div onClick={handleClick}>
      <h3 className="pb-5 bg-gray-700 rounded-md">{poll.title}</h3>
      </div>
      {loggedInUser&& !isClosed ? (
        <>
          <div className="flex gap-4 pl-[30%] pt-3 items-center">
            <h3 className="bg-blue-600 px-3 py-2 text-white rounded-xl">
              Total Votes: <span>{totalVotes}</span>
            </h3>
          </div>
          <Button label="reset" className="mb-5 mt-5" onClick={handleResetPoll}/>
          <Button label="close" onClick={handleClosePoll} />
        </>
      ) : isClosed ? (<></>) : null}
      <p className="pt-5">Created by: {poll.creator_id}</p>
    </div>
  );
}

export default PollCard;
function onPollClose(id: number) {
  throw new Error("Function not implemented.");
}

