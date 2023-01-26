import ResponseType from "../types/response";
import { Response } from "../types/express";
const parseResponse = (
  status: number,
  message: string,
  data: any | null
): ResponseType => {
  return {
    meta: {
      status,
      message,
    },
    data,
  };
};

const response = (res: Response, response: ResponseType) => {
  res.status(response?.meta?.status);
  res.json(response);
  return res;
};
export { parseResponse, response };
