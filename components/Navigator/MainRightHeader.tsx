import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { globalStyles } from "../../src/css/css";
import { currentUserState } from "../../src/atom/currentUserState";
import { useRecoilValue } from "recoil";
import IconButton from "../IconButton";

type Props = {
  onPress: () => void;
};

const MainRightHeader = ({ onPress }: Props) => {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <View
      style={[
        globalStyles.rowContainer,
        {
          alignItems: "center",
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 3,
          marginHorizontal: 5,
        },
      ]}
    >
      {currentUser ? <Text>{currentUser.email}님 안녕하세요!</Text> : null}

      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: currentUser?.profileImg }}
          style={{
            width: 30,
            height: 30,
            marginHorizontal: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: "black",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MainRightHeader;

const styles = StyleSheet.create({});
