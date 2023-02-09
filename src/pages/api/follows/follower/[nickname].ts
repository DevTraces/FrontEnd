import type { NextApiRequest, NextApiResponse } from "next";

type UserData = {
  userId: number;
  profileImageUrl: string;
  username: string;
  nickname: string;
  isFollowing: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[]>
) {
  if (req.method === "GET") {
    res.status(200).json([
      {
        userId: 1,
        profileImageUrl:
          "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        username: "팔로워1",
        nickname: "follower1",
        isFollowing: true
      },
      {
        userId: 2,
        profileImageUrl:
          "https://images.unsplash.com/photo-1535241749838-299277b6305f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=746&q=80",
        username: "팔로워2",
        nickname: "follwer2",
        isFollowing: false
      }
    ]);
  }
}
