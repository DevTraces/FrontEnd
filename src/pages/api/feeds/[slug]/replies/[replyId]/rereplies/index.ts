import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method === "POST") {
    res.status(200).json({
      message: "대댓글 생성"
    });
  }

  if (req.method === "GET") {
    res.status(200).json({
      message: "대댓글리스트 읽기"
    });
  }
}
