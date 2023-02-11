import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: {
    email: string;
    username: string;
    nickname: string;
    profileImageLink: string;
    description: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    res.status(201).json({
      data: {
        email: "codeisneverodd@gmail.com",
        username: "김경현",
        nickname: "codeisneverodd",
        profileImageLink:
          "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        description:
          "안녕하세요. 김경현입니다! 그림에 대한 재미있는 역사 지식을 알고싶으시다면 제 계정을 팔로우해보세요!"
      }
    });
  }
}
