import type { NextApiRequest, NextApiResponse } from "next";

type NoticeLikeData = {
  noticeId: number;
  nickname: string;
  feedId: number;
  noticeType: string;
  imageUrl: string;
  createdAt: Date;
};

type NoticeFollowData = {
  noticeId: number;
  nickname: string;
  noticeType: string;
  imageUrl: string;
  createdAt: Date;
};

type NoticeCommentData = {
  noticeId: number;
  nickname: string;
  content: string;
  feedId: number;
  replyId: number;
  reReplyId?: number;
  noticeType: string;
  imageUrl: string;
  createdAt: Date;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      noticeList: (NoticeLikeData | NoticeFollowData | NoticeCommentData)[];
    };
  }>
) {
  if (req.method === "GET") {
    res.status(200).json({
      data: {
        noticeList: [
          {
            noticeId: 1,
            nickname: "nickname1",
            feedId: 1,
            noticeType: "LIKE",
            imageUrl:
              "https://cdn.pixabay.com/photo/2019/11/19/22/25/animal-4638681_960_720.jpg",
            createdAt: new Date(new Date().getTime() - 5 * 60 * 60 * 1000)
          },
          {
            noticeId: 2,
            nickname: "nickname2",
            noticeType: "FOLLOW",
            imageUrl:
              "https://cdn.pixabay.com/photo/2019/11/19/22/25/animal-4638681_960_720.jpg",
            createdAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
          },
          {
            noticeId: 3,
            nickname: "nickname3",
            content: "nickname3 님이 postId1에 댓글을 남겼습니다.",
            feedId: 1,
            replyId: 1,
            noticeType: "REPLY",
            imageUrl:
              "https://cdn.pixabay.com/photo/2019/11/19/22/25/animal-4638681_960_720.jpg",
            createdAt: new Date(new Date().getTime() - 24 * 24 * 60 * 60 * 1000)
          },
          {
            noticeId: 4,
            nickname: "nickname4",
            content: "nickname4 님이 replyId1 댓글에 대댓글을 남겼습니다.",
            feedId: 1,
            replyId: 1,
            reReplyId: 1,
            noticeType: "REREPLY",
            imageUrl:
              "https://cdn.pixabay.com/photo/2019/11/19/22/25/animal-4638681_960_720.jpg",
            createdAt: new Date(
              new Date().getTime() - 100 * 24 * 60 * 60 * 1000
            )
          }
        ]
      }
    });
  }
}
