
import React from "react";
import PollProfile from "./PollProfile";


async function getPollData(poll_id: number) {
  const res = await fetch(`http://localhost:3000/api/polls/${poll_id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch poll data");
  }
  return res.json();
}

const PollDashboard = async ({ params} : any) => {
  const { poll_id } = params;
  const pollData = await getPollData(poll_id);

  return (
    <div className="flex flex-col justify-start pt-10 gap-4 items-center  bg-gray-900 text-gray-950 font-semibold h-screen">
      <h2 className="bg-orange-500 rounded-xl px-4 py-2">{pollData.title}</h2>
      <PollProfile options={pollData.options} poll_id={poll_id} /> 
      <h4 className="text-white bg-blue-700 px-4 py-3 rounded-md">Created by: {pollData.creator_id}</h4>
    </div>
  );
};

export default PollDashboard;
