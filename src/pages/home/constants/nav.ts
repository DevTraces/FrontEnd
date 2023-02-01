import {
  faHome,
  faSearch,
  faBell,
  faHeart,
  faPlus,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export interface Nav {
  key: "home" | "search" | "alert" | "like" | "newPost" | "profile";
  icon: typeof faHome;
  title: string;
  href: `/${string}`;
}

export const navs: Nav[] = [
  { key: "home", icon: faHome, title: "홈", href: "/home" },
  { key: "search", icon: faSearch, title: "검색", href: "/search" },
  { key: "alert", icon: faBell, title: "알림", href: "/alert" },
  { key: "like", icon: faHeart, title: "좋아요 목록", href: "/like" },
  { key: "newPost", icon: faPlus, title: "새 포스트", href: "/newPosts" },
  { key: "profile", icon: faUser, title: "프로필", href: "/profile" }
];

export default { navs };
