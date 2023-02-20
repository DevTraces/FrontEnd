import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  storage: localStorage
});

interface User {
  nickname: string;
}

export default atom<User>({
  key: "userAtom",
  default: {
    nickname: ""
  },
  effects_UNSTABLE: [persistAtom]
});
