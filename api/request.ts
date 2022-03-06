import axios, { AxiosError } from "axios";

export const requestInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

requestInstance.interceptors.request.use((config: any) => {
  const token = window.localStorage.getItem("token");

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

requestInstance.interceptors.request.use(
  (config: any) => config,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO should redirect to homep age
      console.log("Not authorized");
    }
  }
);
