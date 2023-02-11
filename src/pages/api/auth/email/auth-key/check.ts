import type { NextApiRequest, NextApiResponse } from "next";

interface SuccessData {
  data: {
    isCorrect: boolean;
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
  if (req.method === "POST") {
    try {
      const { authKey } = req.body;

      if (`${authKey}`.includes("1")) {
        res.status(200).json({
          data: { isCorrect: true }
        });
      } else {
        res.status(200).json({
          data: {
            isCorrect: false
          }
        });
      }
    } catch {
      res.status(400).json({
        errorCode: "VALIDATION_FAILED",
        errorMessage:
          "email: 이메일 형식이 올바르지 않습니다, authKey: 메일 인증키 입력은 필수입니다."
      });
    }
  }
}
