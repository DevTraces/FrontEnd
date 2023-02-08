import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method === "PUT") {
    res.status(200).json({
      message: "댓글 수정"
    });
  }

  if (req.method === "DELETE") {
    res.status(200).json({
      message: "댓글 삭제"
    });
  }
}
