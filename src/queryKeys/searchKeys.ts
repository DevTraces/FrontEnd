export default {
  hashtags: (search: string) => ["hashtags", search] as const,
  username: (search: string) => ["username", search] as const,
  nickname: (search: string) => ["nickname", search] as const,
  autocomplete: (search: string) => ["autocomplete", search] as const
};
