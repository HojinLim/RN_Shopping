import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../IconButton";

type Props = {
  iconName: any;
  color: string;
  size?: number;
};

const Icon = ({ color, iconName, size }: Props) => {
  return (
    <Ionicons
      name={iconName}
      // 기본값: 24 / 설정값: size
      size={size ?? 24}
      color={color}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
