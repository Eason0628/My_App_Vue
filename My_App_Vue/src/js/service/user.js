import { get, post } from "@/js/util/request.js";
export function login(data) {
  return post("/login", data);
}
