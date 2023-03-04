import { atom, AtomEffect } from "recoil";

export interface SignUpUser {
  email: string | null;
  password: string | null;
  username: string | null;
  nickname: string | null;
  profileImage: File | null;
  description: string | null;
}

const sessionStorageEffect =
  (key: string): AtomEffect<SignUpUser> =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") return;
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

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
  effects: [sessionStorageEffect("signUpUser")]
});
