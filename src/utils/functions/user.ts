import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../../components/api/firebase/firebase";
import { HJ_USER } from "../../static/const/variable";
import { Alert } from "react-native";

const saveUserData = async (key: string, value: string) => {
  try {
    // AsyncStorage에 데이터 저장
    await AsyncStorage.setItem(key, value);
    console.log("데이터 저장 성공!");
  } catch (error) {
    console.error("데이터 저장 실패:", error);
  }
};

const removeUserData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    // console.log("데이터 삭제 성공!");
  } catch (error) {
    // console.error("데이터 저장 실패:", error);
  }
};

export const signOut = async () => {
  try {
    removeUserData(HJ_USER);
    await auth.signOut();
    Alert.alert("로그아웃 완료!");
  } catch (error) {
    // alert(error);
    console.log("Error signing out:", error);
    // throw error;
  }
};

export { saveUserData, removeUserData };
