import { atom } from "recoil";

const navigationAtom = atom({
  key: "navigation",
  default: "feed"
});

export default navigationAtom;
