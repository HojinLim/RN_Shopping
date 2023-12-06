import { StyleSheet, Text, View } from "react-native";
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
    <View style={globalStyles.rowContainer}>
      {currentUser ? <Text>{currentUser.email}님 안녕하세요!</Text> : null}
      <IconButton
        iconName="person-circle-outline"
        onPress={onPress}
        color="black"
      />
    </View>
  );
};

export default MainRightHeader;

const styles = StyleSheet.create({});
