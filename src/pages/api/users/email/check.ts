import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: { isDuplicated: boolean };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    // const { email } = req.query;

    res.status(200).json({
      data: {
        isDuplicated: false
      }
    });
  }
}
