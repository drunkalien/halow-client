import { AxiosInstance, AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { request } from "../api";

type Args<Data, Params, Error> = {
  url: string;
  params?: Params;
  options?: Omit<
    UseQueryOptions<AxiosResponse<Data, Error>, (string | Params)[]>,
    "queryKey" | "queryFn"
  >;
  fetcherInstance?: AxiosInstance;
  customKey?: any;
};

const useAPIQuery = <Data = any, Params = object, Error = any>({
  url,
  params,
  customKey,
  options = {},
  fetcherInstance = request,
}: Args<Data, Params, Error>) => {
  const query = useQuery(
    customKey || [url, params],
    () => fetcherInstance.get<Data>(url, { params }),
    options
  );
  return { ...query, data: query.data?.data, axiosData: query.data };
};

export default useAPIQuery;
