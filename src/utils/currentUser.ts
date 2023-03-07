import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie
} from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

const isStringCookie = (cookie: CookieValueTypes): cookie is string =>
  typeof cookie === "string";

const getNickname = ({ res, req }: OptionsType = {}) => {
  const nickname = getCookie("nickname", { res, req });

  return isStringCookie(nickname) ? nickname : "nouser";
};

const setNickname = (nickname: string, options: OptionsType = {}) =>
  setCookie("nickname", nickname, options);

const removeNickname = () => deleteCookie("nickname");

const isValidUser = ({ res, req }: OptionsType = {}) =>
  getNickname({ res, req }) !== "nouser" && getNickname({ res, req }) !== "";

const currentUser = {
  getNickname,
  setNickname,
  removeNickname,
  isValidUser
};

export default currentUser;
