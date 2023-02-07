import type { NextApiRequest, NextApiResponse } from "next";

interface SuccessData {
  data: null;
}

interface FailData {
  errorCode: string;
  errorMessage: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessData | FailData>
) {
  if (req.method === "GET") {
    if (!req.query.nickname?.includes("k")) {
      res.status(200).json({
        data: null
      });
    } else {
      res.status(400).json({
        errorCode: "EXIST_NICKNAME_CONFLICT",
        errorMessage: "중복된 닉네임입니다.",
        data: null
      });
    }
  }
}
