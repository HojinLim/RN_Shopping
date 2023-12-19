import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  size?: number;
  title: string;
  onPress?: () => void;

  fontColor?: string;
  customStyle?: object;
};

const TextButton = ({
  size,
  title,
  onPress,
  fontColor,
  customStyle,
}: // asyncPress,
Props) => {
  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress}>
      <Text style={[styles.text, { color: fontColor ? fontColor : "white" }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#499af2",
    height: "auto",
    marginHorizontal: "auto",
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    marginHorizontal: 3,
  },
});
