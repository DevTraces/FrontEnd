import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie
} from "cookies-next";

const isStringCookie = (cookie: CookieValueTypes): cookie is string =>
  typeof cookie === "string";

const getNickname = () => {
  const nickname = getCookie("nickname");

  return isStringCookie(nickname) ? nickname : "nouser";
};

const setNickname = (nickname: string) => setCookie("nickname", nickname);

const removeNickname = () => deleteCookie("nickname");

const currentUser = {
  getNickname,
  setNickname,
  removeNickname
};

export default currentUser;
