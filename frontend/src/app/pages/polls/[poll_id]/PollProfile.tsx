"use client"; 
import { useAuthStore, useStore } from "@/lib/Store";
import Button from "@/lib/utils/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PollOption {
  option_text: string;
  votes: number;
}

interface PollOptionsProps {
  options: PollOption[];
  poll_id: string; 
}

const PollProfile: React.FC<PollOptionsProps> = ({ options, poll_id }) => {
  const router = useRouter();
  const pollResults = useStore((state) => state.pollResults)[poll_id] || {};
  const username = useAuthStore((state) => state.username);

 
  const handleVote = async (optionText: string) => {
    
    const response = await fetch(`/api/polls/${poll_id}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option_text: optionText, username }),
    });

    if (!response.ok) {
      if(response.statusText == "Unauthorized") {
        alert(`${response.statusText} User! Please login`);
        router.push('/pages/login')
      }else{
        alert(`You've already voted !! Explore other polls , Or Create your Own!!! ${response.body}`)
        router.push("/")
      }
    } else {
      console.log(pollResults.optionText);
      alert("Vote added successfully!")
    }
  };

  return (
    <div className="">
      {options.map((option) => (
        <div key={option.option_text} className="flex gap-4 w-96  justify-between pb-4">
          <span className=" bg-white w-full px-4 py-3 rounded-lg">
            {option.option_text} ({pollResults.optionText === option.option_text ? pollResults.votes : option.votes})

          </span>
          <Button onClick={() => handleVote(option.option_text)} label="Vote" className="cursor-pointer rounded-xl"/>
        </div>
      ))}
    </div>
  );
};

export default PollProfile;

