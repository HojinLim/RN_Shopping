// userManage.ts

import "firebase/auth";
import { auth } from "./firebase";
import { User } from "../static/const/type";
import { HJ_USER } from "../static/const/variable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signOut = async () => {
  try {
    await auth.signOut();
    sessionStorage.removeItem(HJ_USER);
    alert("로그아웃 완료!");
  } catch (error) {
    alert(error);
    console.error("Error signing out:", error);
    throw error;
  }
};

export const isLogin = () => {
  const data = AsyncStorage.getItem(HJ_USER);
  data.then((userData) => {
    try {
      return userData == null ? null : (JSON.parse(userData) as User);
    } catch (error) {
      console.log("에러");
    }
  });

  // const userData = sessionStorage.getItem(HJ_USER);
};
