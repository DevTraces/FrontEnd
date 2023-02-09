import type { NextApiRequest, NextApiResponse } from "next";

type CommentData = {
  replyId: number;
  feedId: number;
  authorId: number;
  content: string;
  authorProfileImageUrl: string;
  createdAt: Date;
  modifiedAt: Date;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentData | CommentData[]>
) {
  if (req.method === "POST") {
    res.status(200).json({
      replyId: 1,
      feedId: 1,
      authorId: 1,
      content: "댓글 내용",
      authorProfileImageUrl: "https://placehold.it/100x100",
      createdAt: new Date(),
      modifiedAt: new Date()
    });
  }

  if (req.method === "GET") {
    res.status(200).json([
      {
        replyId: 1,
        feedId: 1,
        authorId: 1,
        content: "댓글 내용",
        authorProfileImageUrl: "https://placehold.it/100x100",
        createdAt: new Date(),
        modifiedAt: new Date()
      },
      {
        replyId: 2,
        feedId: 1,
        authorId: 2,
        content: "댓글 내용",
        authorProfileImageUrl: "https://placehold.it/100x100",
        createdAt: new Date(),
        modifiedAt: new Date()
      }
    ]);
  }
}
