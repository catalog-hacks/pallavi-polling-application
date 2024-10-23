import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST (poll creation)
  if (req.method === "POST") {
    try {
      const response = await fetch("http://127.0.0.1:5500/poll/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(201).json({ poll_id: data });
      } else {
        return res
          .status(response.status)
          .json({ error: "Error creating poll" });
      }
    } catch (error) {
      console.log("Failed to create poll:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Only allow POST requests for this API route
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
