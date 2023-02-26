import type { NextApiRequest, NextApiResponse } from "next";

type NoticeData = {
  noticeNumber: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: NoticeData }>
) {
  if (req.method === "GET") {
    res.status(200).json({
      data: {
        noticeNumber: 1
      }
    });
  }
}
