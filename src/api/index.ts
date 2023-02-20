import axios, { AxiosInstance } from "axios";

interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance["get"]>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance["delete"]>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance["post"]>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance["put"]>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance["patch"]>): Promise<T>;
}

const axiosInstance = (baseURL: string = ""): CustomInstance => {
  const accessToken =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("accessToken") ?? ""
      : "";

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken?.replaceAll('"', "")
    },
    withCredentials: true,
    transformResponse: async res => {
      const json = JSON.parse(res);

      if (Object.hasOwn(json, "errorCode")) {
        if (json.errorCode === "ACCESS_TOKEN_EXPIRED") {
          const {
            data: { accessToken: newAccessToken }
          } = await axios.post("/api/tokens/reissue");
          sessionStorage.setItem("accessToken", newAccessToken);
        }
        throw json;
      }
      if (Object.hasOwn(json, "data")) {
        return json.data;
      }
      return Promise.reject(
        new Error("서버에서 올바르지 않은 형식의 에러가 응답되었습니다.")
      );
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
