type Params = {
  path: string;
  query?: { [key in string]: BodyInit };
};

type HttpRequest = <T = any>(params: Params) => Promise<T>;

type GET = HttpRequest;

type DELETE = HttpRequest;

type PATCH = POST;

type POST = <T = any>(
  params: Params & {
    body?: { [key in PropertyKey]: any };
  }
) => Promise<T>;

const defaultHeaders = {
  "Content-Type": "application/json"
};

const getURL = (path: string, query?: { [key in string]: unknown }) => {
  if (!query) return path;

  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${path}?${queryString}`;
};

const handleResponse = async (url: string, res: Response) => {
  if (!res.ok) {
    const { errorMessage } = await res.json();

    if (!errorMessage)
      throw new Error(`${url} 에러에 errorMessage가 없습니다.`);

    throw new Error(errorMessage);
  }

  const data = await res.json();

  if (!Object.hasOwn(data, "data"))
    throw new Error(`${url} 응답에 data 속성이 없습니다.`);

  return data.data;
};

const get: GET = async ({ path, query }) => {
  const url = getURL(path, query);
  const res = await fetch(url);

  return handleResponse(url, res);
};

const post: POST = async ({ path, query, body = {} }) => {
  const url = getURL(path, query);

  const res = await fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(body)
  });

  return handleResponse(url, res);
};

const api: { get: GET; post: POST; delete: DELETE; patch: PATCH } = {
  get,
  post,
  delete: get,
  patch: post
};

export default api;
