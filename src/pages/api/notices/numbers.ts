import type { NextApiRequest, NextApiResponse } from "next";

type NoticeData = {
  noticeNumber: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NoticeData>
) {
  if (req.method === "GET") {
    res.status(200).json({
      noticeNumber: 1
    });
  }
}
