import { atom } from "recoil";

export default atom({
  key: "resetUserAtom",
  default: { email: "", authKey: "" }
});
