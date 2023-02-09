import type { NextApiRequest, NextApiResponse } from "next";

type CommentData = {
  replyId: number;
  feedId: number;
  authorNickname: string;
  content: string;
  authorProfileImageUrl: string;
  createdAt: Date;
  modifiedAt: Date;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentData | null>
) {
  if (req.method === "PUT") {
    res.status(200).json({
      replyId: 1,
      feedId: 1,
      authorNickname: "1",
      content: "댓글 내용",
      authorProfileImageUrl: "https://placehold.it/100x100",
      createdAt: new Date(),
      modifiedAt: new Date()
    });
  }

  if (req.method === "DELETE") {
    res.status(200).json(null);
  }
}
