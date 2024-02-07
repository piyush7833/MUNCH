import axios from "axios";
import { AxiosRequestHeaders } from "axios";
import tokenHelper from "./tokenHelper";

axios.interceptors.request.use(async (request) => {
    request.headers={
        ...(request.headers as AxiosRequestHeaders),
        Authorization: `${tokenHelper.get("Authorization")}`,
    } as AxiosRequestHeaders;
    return request;
});

export const httpservice={
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
