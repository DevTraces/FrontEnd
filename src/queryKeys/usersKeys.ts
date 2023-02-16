export default {
  userProfile: (nickname: string) => ["users", "profile", nickname] as const
};
