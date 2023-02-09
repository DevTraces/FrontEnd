import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isDuplicated: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { email } = req.query;
    if (email?.includes("1")) {
      res.status(200).json({
        isDuplicated: true
      });
    } else {
      res.status(200).json({
        isDuplicated: false
      });
    }
  }
}
