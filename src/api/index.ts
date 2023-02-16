const END_POINT = "http://54.180.200.170:8080";

type Params = {
  path: string;
  query?: { [key in string | number]: string | number };
  mode?: "prod";
};

type HttpRequest = <T = any>(params: Params) => Promise<T>;

type GET = HttpRequest;

type DELETE = HttpRequest;

type PATCH = POST;

type PUT = POST;

type POST = <T = any>(
  params: Params & {
    body?: { [key in PropertyKey]: any };
  }
) => Promise<T>;

const defaultHeaders = {
  "Content-Type": "application/json"
};

const getURL = (
  path: Params["path"],
  query?: Params["query"],
  mode?: Params["mode"]
) => {
  const queryString = query
    ? `?${Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`
    : "";
  const endpoint = mode === "prod" ? END_POINT : "";

  return `${endpoint}${path}${queryString}`;
};

const handleResponse = async (
  url: ReturnType<typeof getURL>,
  res: Response
) => {
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

const get: GET = async ({ path, query, mode }) => {
  const url = getURL(path, query, mode);
  const res = await fetch(url, {
    headers: defaultHeaders
  });

  return handleResponse(url, res);
};

const post: POST = async ({ path, query, body = {}, mode }) => {
  const url = getURL(path, query, mode);

  const res = await fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(body)
  });

  return handleResponse(url, res);
};

const api: { get: GET; post: POST; delete: DELETE; patch: PATCH; put: PUT } = {
  get,
  post,
  delete: get,
  patch: post,
  put: post
};

export default api;
