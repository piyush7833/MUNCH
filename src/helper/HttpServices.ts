import axios, { AxiosRequestConfig, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import tokenHelperInstance from "./TokenHelper";

axios.interceptors.request.use(
  async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const headers: AxiosHeaders = request.headers || {};
    const authorizationHeader = tokenHelperInstance.get();
    if (authorizationHeader) {
      headers.Authorization = authorizationHeader;
    }
    return { ...request, headers };
//     request.headers={
//         ...request.headers,
//         Authorization: `${tokenHelperInstance.get()}`,
//       };
//       return request;

  }
);

export const httpservice = {
  get: axios.get,
  post: axios.post,
  put: axios.put, 
  delete: axios.delete,
  patch: axios.patch,
};
