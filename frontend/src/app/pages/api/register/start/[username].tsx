import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  try {
    const response = await fetch(`http://127.0.0.1:5500/register/start/${username}`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registration start options' });
  }
}
