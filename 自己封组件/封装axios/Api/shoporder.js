import { get } from "../index";
export function getShoporderDetail() {
  return get("/shoporder/detail");
}

export function getShoporderList() {
  return get("/shoporder/list");
}

export const shoporderApi = {
  getShoporderDetail,
  getShoporderList,
};
