// userManage.ts

import "firebase/auth";
import { auth } from "./firebase";
import { User } from "../../../src/static/const/type";
import { HJ_USER } from "../../../src/static/const/variable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const isLogin = () => {
  const data = AsyncStorage.getItem(HJ_USER);
  data.then((userData) => {
    try {
      return userData == null ? null : (JSON.parse(userData) as User);
    } catch (error) {
      console.log("에러");
    }
  });
};
