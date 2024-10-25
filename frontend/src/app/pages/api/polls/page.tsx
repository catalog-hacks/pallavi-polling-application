import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req :NextApiRequest, res:NextApiResponse) {
    try {
      const response = await fetch('http://127.0.0.1:5500/polls', {method:"POST"}); 
      console.log(`response : ${response}`)
      if (!response.ok) {
        throw new Error('Failed to fetch polls');
      }
      const data = await response.json();
      res.status(200).json(data); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  