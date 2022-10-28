import { get } from "../index";
export function getUserInfo(userId) {
  return get("/user/info", { userId: userId });
}
export function getUserName(userId) {
  return get("/user/name", { userId: userId });
}

export const userApi = {
  getUserInfo,
  getUserName,
};
