import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../IconButton";

type Props = {
  iconName: any;
  btnColor?: string;
  size?: number;
  text?: string;
  onPress: () => void;
  fontColor?: string;
};

const TextIconButton = ({
  btnColor,
  iconName,
  size,
  text,
  onPress,
  fontColor,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons
        name={iconName}
        // 기본값: 24 / 설정값: size
        size={size ?? 24}
        color={btnColor ? btnColor : "white"}
      />
      <Text style={[styles.text, { color: fontColor ? fontColor : "white" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
    marginHorizontal: 3,
  },
});
