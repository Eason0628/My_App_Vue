import { get, post } from "@/js/util/request.js";
export function login(data) {
  return post("/login", data);
}

export function menus() {
  return get("/menu");
}

export function userInfo() {
  return get("/userInfo");
}
