import currentUser from "@/utils/currentUser";
import Router from "next/router";
import { atom, AtomEffect } from "recoil";

export type RouterNavType = "feed" | "saved" | "newPost" | "profile";
export type DrawerNavType = "search" | "alert";

export type NavType = RouterNavType | DrawerNavType;

export const isDrawerNavType = (navType: NavType): navType is DrawerNavType =>
  navType === "search" || navType === "alert";

export const isRouterNavType = (navType: NavType): navType is RouterNavType =>
  !isDrawerNavType(navType);

export const getRouterNavValue = (): { [k in RouterNavType]: string } => ({
  feed: "/feed",
  saved: `/user/${currentUser.getNickname()}/saved`,
  newPost: "/post/new",
  profile: `/user/${currentUser.getNickname()}/posts`
});

const syncRouteEffect: AtomEffect<NavType> = ({ setSelf }) => {
  const handleRouteChange = (path: string) => {
    const nav = getRouterNavValue();
    switch (path) {
      case nav.saved:
        setSelf("saved");
        break;
      case nav.newPost:
        setSelf("newPost");
        break;
      case nav.profile:
      case `/user/${currentUser.getNickname()}/following`:
      case `/user/${currentUser.getNickname()}/follower`:
        setSelf("profile");
        break;
      case nav.feed:
        setSelf("feed");
        break;
      default:
    }
  };

  if (typeof window !== "undefined" && Router) {
    handleRouteChange(Router.asPath);
  }
  Router.events.on("routeChangeComplete", handleRouteChange);

  return () => Router.events.off("routeChangeComplete", handleRouteChange);
};

const navigationAtom = atom<NavType>({
  key: "navigationAtom",
  default: "feed",
  effects: [syncRouteEffect]
});

export default navigationAtom;
