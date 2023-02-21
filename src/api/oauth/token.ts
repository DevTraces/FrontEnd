import axios from "axios";

export const postOAuthToken = async (code: string) => {
  const params = {
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    code
  };

  return axios.post("https://kauth.kakao.com/oauth/token", null, {
    params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  });
};
