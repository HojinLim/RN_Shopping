import { atom } from "recoil";

export const category = {
  ALL: "전체",
  SHIRTS: "상의",
  PANTS: "하의",
  ACCESARY: "액세서리",
};
export const currentCategory = atom<string>({
  key: "currentCategory",
  default: category.ALL,
});
