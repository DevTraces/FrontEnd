import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "signUpUserAtom",
  storage: sessionStorage
});

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
  },
  effects_UNSTABLE: [persistAtom]
});
