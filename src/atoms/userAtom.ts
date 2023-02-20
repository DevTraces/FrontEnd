import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage
});

interface User {
  nickname: string;
}

export default atom<User>({
  key: "userAtom",
  effects_UNSTABLE: [persistAtom]
});
