import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  userId: number;
  profileImageLink: string;
  username: string;
  nickname: string;
  isFollowing: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  if (req.method === "GET") {
    res.status(200).json([
      {
        userId: 1,
        profileImageLink:
          "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        username: "팔로잉1",
        nickname: "following1",
        isFollowing: false
      },
      {
        userId: 2,
        profileImageLink:
          "https://images.unsplash.com/photo-1535241749838-299277b6305f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=746&q=80",
        username: "팔로잉2",
        nickname: "following2",
        isFollowing: true
      }
    ]);
  }
}
