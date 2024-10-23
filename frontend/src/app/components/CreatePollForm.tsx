import { useAuthStore } from "@/lib/Store";
import { useState } from "react";
import { fetchPost } from "@/lib/fetch";
import Button from "@/lib/utils/Button";
import { useRouter } from "next/navigation";

const CreatePollForm = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]); // Start with one empty option
  const username = useAuthStore((state) => state.username); // Get the username from Zustand
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username) {
      const response = await fetch("/api/poll/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          creator: username,
          options,
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Poll created successfully");
        router.push('/');
      } else {
        console.error("Error creating poll");
      }
    } else {
      console.error("User not authenticated");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]); 
  };


  return (
    <div className="flex justify-center items-center h-screen overflow-hidden font-mono font-semibold bg-gray-900 w-full ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-blend-color-burn">
        <div className="flex  flex-col gap-3 w-96">
          <label className="text-white">Poll Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter poll title"
            className="px-3 py-2 rounded-xl w-full"
            required
          />
        </div>

        <div className="flex  flex-col gap-3">
          <label className="text-white">Options</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
                className="px-3 py-2 rounded-xl w-full"
              />
            </div>
          ))}
          <div className="flex gap-3">
          <Button label="Add options" onClick={addOption} className="rounded-xl w-full"/>
          </div>
        </div>

        <Button label="Create Poll" className="bg-orange-600 mt-4 text-xl text-gray-950"/>
      </form>
    </div>
  );
};

export default CreatePollForm;
