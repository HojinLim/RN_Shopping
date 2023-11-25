import { atom } from "recoil";
import { User } from "../static/const/type";

export const currentUserState = atom<User | null>({
  key: "currentUserState",
  default: null,
});
