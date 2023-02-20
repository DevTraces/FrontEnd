import axios, { AxiosInstance } from "axios";

interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance["get"]>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance["delete"]>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance["post"]>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance["put"]>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance["patch"]>): Promise<T>;
}

const axiosInstance = (baseURL: string = ""): CustomInstance => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    transformResponse: res => {
      const json = JSON.parse(res);
      if (!Object.hasOwn(json, "data")) {
        // eslint-disable-next-line no-console
        console.error(res);
        throw new Error("응답에 data 속성이 없습니다.");
      }
      return json.data;
    }
  });

  instance.interceptors.response.use(res => res.data);

  return instance;
};

const api = {
  dev: axiosInstance(),
  prod: axiosInstance("http://54.180.200.170:8080")
};
export default api;
