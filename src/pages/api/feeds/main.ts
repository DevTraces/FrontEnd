import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  feedId: number;
  authorId: string;
  authorProfileImageLink: string;
  authorNickname: string;
  content: string;
  imageLinks: string[];
  hashtags: string[];
  numberOfLike: number;
  numberOfReply: number;
  isLiked: boolean;
  createdAt: Date;
  modifiedAt: Date;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  if (req.method === "GET") {
    res.status(200).json([
      {
        feedId: 1,
        authorId: "1",
        authorProfileImageLink:
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        authorNickname: "김철수",
        content: "첫번째 피드입니다.",
        imageLinks: [
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1627647227768-705244233b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ],
        hashtags: ["#첫번째", "#피드"],
        numberOfLike: 1,
        numberOfReply: 1,
        isLiked: true,
        createdAt: new Date(),
        modifiedAt: new Date()
      }
    ]);
  }
}
