import type { NextApiRequest, NextApiResponse } from "next";

interface SuccessData {
  data: null;
}

interface FailData {
  errorCode: string;
  errorMessage: string;
}

let a = 0;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessData | FailData>
) {
  if (req.method === "POST") {
    a += 1;
    if (a % 2 === 0) {
      res.status(200).json({
        data: null
      });
    } else {
      res.status(400).json({
        errorCode: "EMAIL_AUTH_KEY_MISMATCH",
        errorMessage: "메일 인증코드가 일치하지 않습니다."
      });
    }
  }
}
