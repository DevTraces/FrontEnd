import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).json({ message: "Follow" });
  }
  if (req.method === "DELETE") {
    res.status(200).json({ message: "Unfollow" });
  }
}
