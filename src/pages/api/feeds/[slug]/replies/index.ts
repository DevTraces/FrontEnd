import type { NextApiRequest, NextApiResponse } from "next";

type CommentData = {
  replyId: number;
  feedId: number;
  authorNickname: string;
  content: string;
  authorProfileImageUrl: string;
  numberOfRereply: number;
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
      authorNickname: "1",
      content: "댓글 내용",
      authorProfileImageUrl: "https://placehold.it/100x100",
      numberOfRereply: 8,
      createdAt: new Date(),
      modifiedAt: new Date()
    });
  }

  if (req.method === "GET") {
    res.status(200).json([
      {
        replyId: 1,
        feedId: 1,
        authorNickname: "1",
        content: "댓글 내용",
        authorProfileImageUrl: "https://placehold.it/100x100",
        numberOfRereply: 8,
        createdAt: new Date(),
        modifiedAt: new Date()
      },
      {
        replyId: 2,
        feedId: 1,
        authorNickname: "2",
        content: "댓글 내용",
        authorProfileImageUrl: "https://placehold.it/100x100",
        numberOfRereply: 8,
        createdAt: new Date(),
        modifiedAt: new Date()
      }
    ]);
  }
}
