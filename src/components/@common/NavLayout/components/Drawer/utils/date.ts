const DAY_TIME = 1000 * 60 * 60 * 24;

const getDateFormat = (date: string) => {
  const now = new Date();
  const target = new Date(date);

  const diff = now.getTime() - target.getTime();

  if (diff < DAY_TIME) return `${Math.floor(diff / (1000 * 60 * 60))}h`;

  if (diff < DAY_TIME * 7) return `${Math.floor(diff / DAY_TIME)}d`;

  return `${Math.floor(diff / (DAY_TIME * 7))}w`;
};

export default getDateFormat;
