import { userApi } from "./user";
import { shoporderApi } from "./shoporder";

export const api = {
  ...userApi,
  ...shoporderApi,
};
