export default {
  all: ["follows"],
  followerList: (nickname: string) =>
    ["follows", "followerList", nickname] as const,
  followingList: (nickname: string) =>
    ["follows", "followingList", nickname] as const
};
