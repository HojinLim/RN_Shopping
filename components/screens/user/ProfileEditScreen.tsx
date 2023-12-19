import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList, User } from "src/static/const/type";
import TextButton from "@components/common/TextButton";
import IconButton from "@components/IconButton";

import * as ImagePicker from "expo-image-picker";
import {
  convertUrIToBlob,
  downloadBasicProfileImage,
  uploadBasicProfileImage,
  uploadProfileImage,
  uploadStringProfileImage,
} from "@components/api/firebase/storage/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "src/atom/currentUserState";

type ProfileScreenProp = StackScreenProps<RootStackParamList, "ProfileEdit">;
const ProfileEditScreen = ({ route, navigation }: ProfileScreenProp) => {
  // 현재 이미지 주소
  const [imageUri, setImageUri] = useState<string>();

  const [user, setUser] = useRecoilState(currentUserState);
  // 권한 요청을 위한 hooks
  const [status, requestImagePermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    setImageUri(route.params.uri);
  }, []);

  const updateUserImage = (uri: string) => {
    const newUser = {
      ...user,
      profileImg: uri,
    } as User;
    setUser(newUser);
  };

  const setImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestImagePermission();
      if (!permission.granted) {
        return;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    }
    const uri = result.assets[0].uri;

    console.log(uri);
    setImageUri(uri);
    updateUserImage(uri);

    const blob = await convertUrIToBlob(uri);
    uploadProfileImage(blob, user?.uid ?? "");
  };

  // 프로필을 삭제하면 기본 이미지로 업데이트 됩니다.
  const deleteProfileHandler = async () => {
    setImageUri("");
    const basicImg = await downloadBasicProfileImage();
    setImageUri(basicImg);
    updateUserImage(basicImg);
    const blob = await convertUrIToBlob(basicImg);
    uploadStringProfileImage(blob, user?.uid);
  };

  const uri = route.params.uri;
  console.log(uri);
  return (
    <View style={styles.outerContainer}>
      <IconButton
        iconName={"arrow-back"}
        size={35}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {uri && (
        <View style={styles.innerContainer}>
          <Image style={styles.image} source={{ uri: imageUri }} />
          <View style={styles.buttonContainer}>
            <TextButton title="수정하기" onPress={setImage} />
            <IconButton
              color="black"
              iconName={"trash-outline"}
              onPress={deleteProfileHandler}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  innerContainer: {
    flex: 1,
    marginTop: 80,
    alignContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 440,
    borderRadius: 18,
    borderColor: "black",
    borderWidth: 3,
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
