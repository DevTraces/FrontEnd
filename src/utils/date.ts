const DAY_TIME = 1000 * 60 * 60 * 24;

const getDateFormat = (date: Date | string) => {
  const now = new Date();
  const target = new Date(date);

  const diff = now.getTime() - target.getTime();

  if (diff < 1000 * 60) return "방금";

  if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))}분`;

  if (diff < DAY_TIME) return `${Math.floor(diff / (1000 * 60 * 60))}시간`;

  if (diff < DAY_TIME * 7) return `${Math.floor(diff / DAY_TIME)}일`;

  return `${Math.floor(diff / (DAY_TIME * 7))}주`;
};

export default getDateFormat;
