import type { NextApiRequest, NextApiResponse } from "next";

type UserData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: UserData[] }>
) {
  if (req.method === "GET") {
    res.status(200).json({
      data: [
        {
          userId: 1,
          username: "팔로잉1",
          nickname: "following1",
          profileImageUrl:
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80"
        }
      ]
    });
  }
}
