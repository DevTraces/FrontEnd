import { NavType } from "@/atoms/navigationAtom";
import {
  faBell,
  faBookmark,
  faHome,
  faPlus,
  faSearch,
  faUser,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

const NAV_ICON: { [k in NavType]: IconDefinition } = {
  alert: faBell,
  feed: faHome,
  newPost: faPlus,
  profile: faUser,
  saved: faBookmark,
  search: faSearch
};

export default NAV_ICON;
