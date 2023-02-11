import type { NextApiRequest, NextApiResponse } from "next";

type NoticeLikeData = {
  nickname: string;
  feedId: number;
  noticeType: string;
  imageUrl: string;
  isChecked: boolean;
  createdAt: string;
};

type NoticeFollowData = {
  nickname: string;
  senderNickname: string;
  noticeType: string;
  imageUrl: string;
  isChecked: boolean;
  createdAt: string;
};

type NoticeCommentData = {
  nickname: string;
  content: string;
  feedId: number;
  replyId: number;
  reReplyId?: number;
  noticeType: string;
  imageUrl: string;
  isChecked: boolean;
  createdAt: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: (NoticeLikeData | NoticeFollowData | NoticeCommentData)[];
  }>
) {
  if (req.method === "GET") {
    res.status(200).json({
      data: [
        {
          nickname: "nickname1",
          feedId: 1,
          noticeType: "LIKE",
          isChecked: false,
          imageUrl: "https://www...",
          createdAt: "2023-02-07T09:59:23.653281"
        },
        {
          nickname: "nickname2",
          senderNickname: "1",
          noticeType: "FOLLOW",
          isChecked: false,
          imageUrl: "https://www...",
          createdAt: "2023-02-07T09:59:23.653281"
        },
        {
          nickname: "nickname3",
          content: "nickname3 님이 postId1에 댓글을 남겼습니다.",
          feedId: 1,
          replyId: 1,
          noticeType: "REPLY",
          isChecked: false,
          imageUrl: "https://www...",
          createdAt: "2023-02-07T09:59:23.653281"
        },
        {
          nickname: "nickname4",
          content: "nickname4 님이 replyId1 댓글에 대댓글을 남겼습니다.",
          feedId: 1,
          replyId: 1,
          reReplyId: 1,
          noticeType: "REREPLY",
          isChecked: false,
          imageUrl: "https://www...",
          createdAt: "2023-02-07T09:59:23.653281"
        }
      ]
    });
  }
}
