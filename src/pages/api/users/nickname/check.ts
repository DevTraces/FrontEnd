import type { NextApiRequest, NextApiResponse } from "next";

interface SuccessData {
  data: {
    isDuplicated: boolean;
  };
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
    try {
      res.status(200).json({
        data: {
          isDuplicated: req.query.nickname?.includes("k") ?? true
        }
      });
    } catch {
      res.status(400).json({
        errorCode: "VALIDATION_FAILED",
        errorMessage:
          "email: 이메일 형식이 올바르지 않습니다, nickname: 닉네임 입력은 필수입니다."
      });
    }
  }
}
