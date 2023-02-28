import {
  faHome,
  faSearch,
  faBell,
  faPlus,
  faUser,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

export interface Nav {
  key: "feed" | "search" | "alert" | "saved" | "new" | "posts";
  icon: typeof faHome;
  title: string;
  href: `/${string}`;
}

export const generateNavs = (nickname: string): Nav[] => {
  return [
    { key: "feed", icon: faHome, title: "홈", href: "/feed" },
    { key: "search", icon: faSearch, title: "검색", href: "/search" },
    { key: "alert", icon: faBell, title: "알림", href: "/alert" },
    {
      key: "saved",
      icon: faBookmark,
      title: "저장한 목록",
      href: `/user/${nickname}/saved`
    },
    { key: "new", icon: faPlus, title: "새 포스트", href: "/post/new" },
    {
      key: "posts",
      icon: faUser,
      title: "프로필",
      href: `/user/${nickname}/posts`
    }
  ];
};
