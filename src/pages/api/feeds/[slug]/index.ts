import type { NextApiRequest, NextApiResponse } from "next";

type FeedData = {
  feedId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
  content: string;
  imageUrls: string[];
  hashtags: string[];
  numberOfLike: number;
  numberOfReply: number;
  liked: boolean;
  saved: boolean;
  createdAt: Date;
  modifiedAt: Date;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedData | FeedData[] | null>
) {
  const { slug } = req.query;

  if (Number.isNaN(Number(slug)) && req.method === "GET") {
    res.status(200).json([
      {
        feedId: 1,
        authorProfileImageUrl:
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        authorNickname: "김철수",
        content: "첫번째 피드입니다.",
        imageUrls: [
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1627647227768-705244233b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ],
        hashtags: ["#첫번째", "#피드"],
        numberOfLike: 1,
        numberOfReply: 1,
        liked: true,
        saved: true,
        createdAt: new Date(),
        modifiedAt: new Date()
      }
    ]);
  }

  if (!Number.isNaN(Number(slug)) && req.method === "GET") {
    res.status(200).json({
      feedId: 1,
      authorProfileImageUrl:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      authorNickname: "김철수",
      content: "첫번째 피드입니다.",
      imageUrls: [
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1627647227768-705244233b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      ],
      hashtags: ["#첫번째", "#피드"],
      numberOfLike: 1,
      numberOfReply: 1,
      liked: true,
      saved: false,
      createdAt: new Date(),
      modifiedAt: new Date()
    });
  }

  if (slug === "feedId" && req.method === "PUT") {
    res.status(200).json({
      feedId: 1,
      authorProfileImageUrl:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      authorNickname: "김철수",
      content: "첫번째 피드입니다.",
      imageUrls: [
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1627647227768-705244233b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      ],
      hashtags: ["#첫번째", "#피드"],
      numberOfLike: 1,
      numberOfReply: 1,
      liked: true,
      saved: true,
      createdAt: new Date(),
      modifiedAt: new Date()
    });
  }

  if (Number.isNaN(Number(slug)) && req.method === "DELETE") {
    res.status(200).json(null);
  }
}
