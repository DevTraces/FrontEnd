import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    res.status(200).json({
      data: null
    });
  }
}
