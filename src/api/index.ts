/* eslint-disable import/prefer-default-export */
export async function get<T = any>({
  path,
  query
}: {
  path: string;
  query?: { [key in string]: unknown };
}): Promise<T> {
  const url = (() => {
    if (!query) return path;

    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return `${path}?${queryString}`;
  })();

  const res = await fetch(url);

  if (!res.ok) {
    const { errorMessage } = await res.json();

    if (!errorMessage) throw new Error("에러에 errorMessage가 없습니다.");

    throw new Error(errorMessage);
  }

  const { data } = await res.json();

  if (!data) throw new Error("응답에 data 속성이 없습니다.");

  return data;
}
