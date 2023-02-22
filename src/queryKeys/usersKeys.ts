export default {
  all: ["users"],
  userProfile: (nickname: string) => ["users", "profile", nickname] as const
};
