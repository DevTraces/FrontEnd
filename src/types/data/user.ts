export type ProfileTabName = "posts" | "saved" | "following" | "follower";

export type ProfileData = {
  username: string;
  nickname: string;
  description: string;
  profileImageUrl: string;
  totalFeedNumber: number;
  followerNumber: number;
  followingNumber: number;
  isFollowing: boolean;
};

export type ProfilePatchData = Pick<
  ProfileData,
  "username" | "nickname" | "description"
>;
