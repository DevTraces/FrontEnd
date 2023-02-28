import axios, { AxiosInstance } from "axios";

const API_ENDPOINT = "https://api.artbubble-zerobase.com";

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
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true,
    transformResponse: async res => {
      const json = JSON.parse(res);

      if (Object.hasOwn(json, "data")) {
        return json.data;
      }
      return Promise.reject(
        new Error("서버에서 올바르지 않은 형식의 에러가 응답되었습니다.")
      );
    }
  });

  instance.interceptors.response.use(
    res => res.data,
    err => {
      const {
        config,
        response: { status }
      } = err;
      if (status !== 401 || config.sent) return Promise.reject(err);

      if (status === 401)
        axios.post(`${API_ENDPOINT}/api/tokens/reissue`, null, {
          withCredentials: true
        });

      config.sent = true;
      return axios(config);
    }
  );

  return instance;
};

const api = {
  dev: axiosInstance(),
  prod: axiosInstance(API_ENDPOINT)
};

export default api;
