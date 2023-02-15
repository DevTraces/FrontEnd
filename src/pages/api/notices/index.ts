import type { NextApiRequest, NextApiResponse } from "next";

type NoticeLikeData = {
  noticeId: number;
  nickname: string;
  feedId: number;
  feedContent: string;
  noticeType: string;
  likeProfileImageUrl: string;
  feedFirstImageUrl: string;
  createdAt: string;
};

type NoticeFollowData = {
  noticeId: number;
  senderNickname: string;
  noticeType: string;
  followerProfileImageUrl: string;
  createdAt: string;
  isFollowing: boolean;
};

type NoticeCommentData = {
  noticeId: number;
  nickname: string;
  content: string;
  feedId: number;
  replyId: number;
  noticeType: string;
  replierProfileImageUrl: string;
  feedFirstImageUrl: string;
  createdAt: string;
};

type NoticeReCommentData = {
  noticeId: number;
  nickname: string;
  content: string;
  feedId: number;
  replyId: number;
  reReplyId: number;
  noticeType: string;
  noticeTarget: string;
  rereplierImageUrl: string;
  feedFirstImageUrl: string;
  createdAt: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      noticeList: (
        | NoticeLikeData
        | NoticeFollowData
        | NoticeCommentData
        | NoticeReCommentData
      )[];
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
            feedContent: "오늘 맛집 찾음~",
            noticeType: "LIKE",
            feedFirstImageUrl: "https://www...",
            likeProfileImageUrl: "https://www...",
            createdAt: "2023-02-07T09:59:23.653281"
          },
          {
            noticeId: 2,
            nickname: "nickname2",
            senderNickname: "senderNickname1",
            noticeType: "FOLLOW",
            followerProfileImageUrl: "https://www...",
            createdAt: "2023-02-07T09:59:23.653281",
            isFollowing: true
          },
          {
            noticeId: 3,
            nickname: "nickname3",
            content: "사진 잘 보고 갑니다~!~!",
            feedId: 1,
            replyId: 1,
            noticeType: "REPLY",
            feedFirstImageUrl: "https://www@J...",
            replierProfileImageUrl: "https://www@J...",
            createdAt: "2023-02-07T09:59:23.653281"
          },
          {
            noticeId: 4,
            nickname: "nickname4",
            content: "안녕하세요 같이 맞팔해요~",
            feedId: 1,
            replyId: 1,
            reReplyId: 1,
            noticeType: "REREPLY",
            feedFirstImageUrl: "https://www@J...",
            rereplierImageUrl: "https://www...",
            createdAt: "2023-02-07T09:59:23.653281",
            noticeTarget: "nickname3"
          }
        ]
      }
    });
  }
}
