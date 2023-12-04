import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../src/atom/currentUserState";
import LoginScreen from "./LoginScreen";
import ColoredButton from "../common/ColoredButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../src/static/const/type";
import { signOut } from "../api/firebase/userManage";

const testHandler = () => {};
const AccountScreen = () => {
  const currentUser = useRecoilValue(currentUserState);
  const navi = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDeleteAccount = () => {
    Alert.alert(
      "삭제 확인",
      "정말로 계정을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",

          onPress: () => {
            // 계정 삭제 로직
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {!currentUser ? (
        <LoginScreen />
      ) : (
        <View style={styles.container}>
          <Text style={styles.heading}>내 정보</Text>
          <Image
            source={require("../../assets/test.png")}
            style={styles.itemImage}
          />

          {/* 이메일 정보 */}
          <View style={styles.infoItem}>
            <Text>Email: {currentUser.email}</Text>
          </View>

          {/* 좋아요 상품 목록으로 가는 버튼 */}
          <ColoredButton
            color="#3498db"
            onPressed={() => {
              navi.navigate("Like");
            }}
          >
            좋아요 상품 목록
          </ColoredButton>

          {/* 장바구니 목록으로 가는 버튼 */}
          <ColoredButton
            color="#3498db"
            onPressed={() => {
              navi.navigate("Cart");
            }}
          >
            장바구니 목록
          </ColoredButton>

          {/* 비밀번호 변경 버튼 */}
          <ColoredButton color="#3498db" onPressed={testHandler}>
            비밀번호 변경
          </ColoredButton>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <ColoredButton color="red" onPressed={() => signOut()}>
              로그아웃
            </ColoredButton>
            <View style={{ marginLeft: 10 }}>
              <ColoredButton color="red" onPressed={handleDeleteAccount}>
                계정삭제
              </ColoredButton>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 8,
  },
});
