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
            feedFirstImageUrl:
              "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            likeProfileImageUrl:
              "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
            createdAt: "2023-02-07T09:59:23.653281"
          },
          {
            noticeId: 2,
            nickname: "nickname2",
            senderNickname: "senderNickname1",
            noticeType: "FOLLOW",
            followerProfileImageUrl:
              "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1078&q=80",
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
            feedFirstImageUrl:
              "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            replierProfileImageUrl:
              "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
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
            feedFirstImageUrl:
              "https://images.unsplash.com/photo-1558522195-e1201b090344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            rereplierImageUrl:
              "https://images.unsplash.com/photo-1604782666037-3c63d50052db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            createdAt: "2023-02-07T09:59:23.653281",
            noticeTarget: "nickname3"
          }
        ]
      }
    });
  }
}
