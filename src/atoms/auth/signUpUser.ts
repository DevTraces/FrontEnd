import { atom } from "recoil";

export interface SignUpUser {
  email: string | null;
  password: string | null;
  username: string | null;
  nickname: string | null;
  profileImage?: File | null;
  description?: string | null;
}

export const signUpUserAtom = atom<SignUpUser>({
  key: "signUpUserAtom",
  default: {
    email: null,
    password: null,
    username: null,
    nickname: null,
    profileImage: null,
    description: null
  }
});
