import React, { useEffect, useState } from "react";
import PollCard from "./PollCard";
import Button from "@/lib/utils/Button"; // Assuming Button component exists

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch polls from the API with query params
  const fetchPolls = async (queryParam = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/polls${queryParam}`,{method: "POST"});
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }
      setPolls(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all polls initially
  useEffect(() => {
    fetchPolls();
  }, []);

  // if (loading) return <div>Loading polls...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10">
      {/* Buttons for fetching different poll types */}
      <div className="flex gap-5 justify-center pb-10">
        <Button onClick={() => fetchPolls()} label="All Polls" />
        <Button onClick={() => fetchPolls("?live=true")} label="Live Polls" />
        <Button onClick={() => fetchPolls("?closed=true")} label="Closed Polls" />
      </div>
      
      {/* Polls List */}
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        <ul className="flex gap-5 justify-center ml-10 mr-10 flex-wrap">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PollList;
