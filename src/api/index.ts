import currentUser from "@/utils/currentUser";
import axios, { AxiosInstance } from "axios";

const API_ENDPOINT = "https://api.artbubble-zerobase.com";

interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance["get"]>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance["delete"]>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance["post"]>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance["put"]>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance["patch"]>): Promise<T>;
}

export const refresh = async () => {
  const res = await axios.post(`${API_ENDPOINT}/api/tokens/reissue`, null, {
    withCredentials: true
  });
  currentUser.setNickname(res.data.data.nickname);

  return res;
};

const axiosInstance = (baseURL: string = ""): CustomInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true,
    transformResponse: res => {
      const json = JSON.parse(res);
      return json.data ? json.data : json;
    }
  });

  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    async err => {
      const { config, response } = err;
      if (response?.status !== 401 || config.sent) throw err;

      config.sent = true;

      if (response?.status === 401) {
        try {
          await refresh();
          return await axios(config);
        } catch (e: any) {
          currentUser.removeNickname();
          throw e;
        }
      }
      throw err;
    }
  );

  return instance;
};

const api = {
  dev: axiosInstance(),
  prod: axiosInstance(API_ENDPOINT)
};

export default api;
