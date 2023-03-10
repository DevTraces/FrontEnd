import type { NextApiRequest, NextApiResponse } from "next";

type NestedCommentData = {
  rereplyId: number;
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
  res: NextApiResponse<{ data: NestedCommentData | NestedCommentData[] }>
) {
  if (req.method === "POST") {
    res.status(200).json({
      data: {
        rereplyId: 1,
        replyId: 1,
        feedId: 1,
        authorNickname: "1",
        content: "대댓글 내용",
        authorProfileImageUrl: "https://placehold.it/100x100",
        createdAt: new Date(),
        modifiedAt: new Date()
      }
    });
  }

  if (req.method === "GET") {
    res.status(200).json({
      data: [
        {
          rereplyId: 1,
          replyId: 1,
          feedId: 1,
          authorNickname: "3",
          content: "대댓글 내용",
          authorProfileImageUrl: "https://placehold.it/100x100",
          createdAt: new Date(),
          modifiedAt: new Date()
        },
        {
          rereplyId: 2,
          replyId: 1,
          feedId: 1,
          authorNickname: "4",
          content: "대댓글 내용",
          authorProfileImageUrl: "https://placehold.it/100x100",
          createdAt: new Date(),
          modifiedAt: new Date()
        },
        {
          rereplyId: 3,
          replyId: 1,
          feedId: 1,
          authorNickname: "7",
          content: "대댓글 내용",
          authorProfileImageUrl: "https://placehold.it/100x100",
          createdAt: new Date(),
          modifiedAt: new Date()
        }
      ]
    });
  }
}
