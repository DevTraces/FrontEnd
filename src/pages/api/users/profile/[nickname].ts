import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: {
    username: string;
    nickname: string;
    description: string;
    profileImageUrl: string;
    totalFeedNumber: number;
    followerNumber: number;
    followingNumber: number;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({
      data: {
        username: "춘시깅",
        nickname: "choonsik",
        description:
          "안녕하세요. 자기소개입니당. :)안녕하세요. 자기소개입니당. :)안녕하세요. 자기소개입니당. :) ",
        profileImageUrl:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
        totalFeedNumber: 10,
        followerNumber: 5,
        followingNumber: 10
      }
    });
  }
}
