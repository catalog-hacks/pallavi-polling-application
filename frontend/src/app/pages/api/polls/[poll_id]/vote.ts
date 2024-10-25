// pages/api/polls/[poll_id]/vote.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function voteHandler(req: NextApiRequest, res: NextApiResponse) {
  const { poll_id } = req.query;
  const { option_text, creator_id } = req.body;

  if (req.method === 'POST') {
    try {
      const response = await fetch(`http://localhost:3000/api/polls/${poll_id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          option_text,
          creator_id,
        }),
      });

      if (response.ok) {
        res.status(200).json({ message: "Vote submitted successfully" });
      } else {
        res.status(500).json({ error: "Failed to submit vote" });
      }
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
