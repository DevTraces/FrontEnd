export default {
  all: ["feeds"] as const,
  feed: (feedId: number) => ["feeds", "feed", feedId] as const,
  feeds: (nickname: string) => ["feeds", nickname] as const,
  replies: (feedId: number) => ["feeds", "replies", feedId] as const,
  rereplies: (feedId: number, replyId: number) =>
    ["feeds", "rereplies", feedId, replyId] as const,
  likeUsers: (feedId: number) => ["feeds", "likes", feedId] as const,
  main: () => ["feeds", "main"] as const
};
