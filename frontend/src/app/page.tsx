"use client"
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { useStore } from "@/lib/Store";

export default function Home() {
  const updatePollResults = useStore((state) => state.updatePollResults);
  const setClosedPoll = useStore((state) => state.setClosedPoll);
  const connectWebSocket = () => {
    const socket = new WebSocket("ws://localhost:5500/ws");

    socket.addEventListener('open', () => {
      console.log("WebSocket is connected.");
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket closed, reconnecting...', event);
      setTimeout(connectWebSocket, 1000); 
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.poll_id && data.option_text && data.vote_count !== undefined) {
        updatePollResults(data.poll_id,data.option_text, data.vote_count); 
      }
      // if (data.poll_id && data.closed) {
      //   setClosedPoll(data.poll_id); // Update the state to mark the poll as closed
      // }
    });

    socket.addEventListener('error', (error) => {
      console.error("WebSocket error:", error);
    });

    return socket;
  };

  useEffect(() => {
    const socket = connectWebSocket();

    return () => {
      socket.close();
    };
  }, [updatePollResults ]);
  return (
    <div>
      <Dashboard/>
    </div>
  );
}

