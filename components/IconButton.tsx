import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  iconName: any;
  color: string;
  size?: number;
};

const IconButton = ({ color, iconName, onPress, size }: Props) => {
  return (
    <Pressable>
      <Ionicons
        name={iconName}
        onPress={onPress}
        // 기본값: 24 / 설정값: size
        size={size ?? 24}
        color={color}
      />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
