import axios, { AxiosError, AxiosRequestConfig } from "axios";
type Params = Record<string, any>;

export const helper = {
  APICALL: {
    POST: async (url: string, params: Params) => {
      try {
        return await axios.post(url, params);
      } catch (e: unknown) {
        throw new Error(JSON.stringify(e as AxiosError));
      }
    },
    GET: async (url: string) => {
      try {
        return await axios.get(url);
      } catch (e: unknown) {
        throw new Error(JSON.stringify(e as AxiosError));
      }
    },
    PUT: async (url: string, params: Params) => {
      try {
        return await axios.put(url, params);
      } catch (e: unknown) {
        throw new Error(JSON.stringify(e as AxiosError));
      }
    },
    DELETE: async (url: string, id?: string) => {
      try {
        return await axios.delete(url, { id } as AxiosRequestConfig);
      } catch (e: unknown) {
        throw new Error(JSON.stringify(e as AxiosError));
      }
    },
  },
};
