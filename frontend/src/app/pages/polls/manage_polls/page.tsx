"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/Store";
import Button from "@/lib/utils/Button";
import { useRouter } from "next/navigation";
import PollCard from "@/app/components/PollCard";

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

interface PollsResponse {
  polls: Poll[];
  user_id: string;
}
const MyPolls: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]); 
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { username } = useAuthStore(); 
  const router = useRouter();

  const fetchMyPolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/polls/manage", { method: "POST" });
      const data: PollsResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }

      setPolls(Array.isArray(data.polls) ? data.polls : []);  
      setUserId(data.user_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPolls();
  }, []);

  if (loading) return <div>Loading your polls...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePollClose = (pollId: number) => {
    setPolls((prevPolls) => 
      prevPolls.map((poll) => 
        poll.id === pollId ? { ...poll, closed: true } : poll
      )
    );
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Button onClick={() => router.push("/")} label="Back to Dashboard" className="absolute ml-[-67%]" />
      <h1 className="text-2xl font-bold pb-10">Your Polls</h1>

      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        <ul className="flex gap-5 justify-center ml-10 mr-10 flex-wrap">
          {polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

            return (
              <li key={poll.id}>
                <PollCard poll={poll} loggedInUser={poll.creator_id === userId} totalVotes={totalVotes} onPollClose={handlePollClose}/>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyPolls;