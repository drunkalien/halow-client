import axios, { AxiosError } from "axios";

const requestInstance = axios.create({
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
      // TODO should redirect to home page
      console.log("Not authorized");
    }
  }
);

export default requestInstance;
