import api from "@/api";

export const postSignUp = (data: {
  email: string;
  username: string;
  nickname: string;
  password: string;
  signUpKey: string;
  profileImage?: File;
}) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => formData.append(key, value));

  return api.prod.post<{
    email: string;
    username: string;
    nickname: string;
    profileImageUrl: string;
    description: string;
    isSignUpKeyCorrect: boolean;
  }>("/api/auth/sign-up", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
