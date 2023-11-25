import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { currentUserState } from "../../src/atom/currentUserState";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebase/firebase";
import { User } from "../../src/static/const/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HJ_USER } from "../../src/static/const/variable";
import { removeUserData, saveUserData } from "../../src/utils/functions/user";

type Props = {};

const IntroScreen = (props: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const curretUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          created_at: user.metadata.creationTime,
        } as User;

        // AsyncStorage.setItem(HJ_USER, JSON.stringify(curretUser));
        saveUserData(HJ_USER, JSON.stringify(curretUser));
        setCurrentUser(curretUser);
      } else {
        removeUserData(HJ_USER);
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <View>
      <Text>
        {currentUser
          ? currentUser?.email + "님, 안녕하세요!"
          : "로그인 정보 없음"}
      </Text>
      <Text>IntroScreen</Text>
    </View>
  );
};

export default IntroScreen;
