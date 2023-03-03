import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie
} from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";

const isStringCookie = (cookie: CookieValueTypes): cookie is string =>
  typeof cookie === "string";

type CookieOptions = {
  res?: ServerResponse<IncomingMessage>;
  req?: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  };
};

const getNickname = ({ res, req }: CookieOptions = {}) => {
  const nickname = getCookie("nickname", { res, req });

  return isStringCookie(nickname) ? nickname : "nouser";
};

const setNickname = (nickname: string) => setCookie("nickname", nickname);

const removeNickname = () => deleteCookie("nickname");

const isValidUser = ({ res, req }: CookieOptions = {}) =>
  getNickname({ res, req }) !== "nouser" && getNickname({ res, req }) !== "";

const currentUser = {
  getNickname,
  setNickname,
  removeNickname,
  isValidUser
};

export default currentUser;
