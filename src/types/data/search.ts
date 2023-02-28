export type UserSearchResultData = {
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export type SearchValue = {
  type: "username" | "nickname" | "tag";
  value: string;
  isTyping: boolean;
};
