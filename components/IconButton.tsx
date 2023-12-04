import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  iconName: any;
  color: string;
};

const IconButton = ({ color, iconName, onPress }: Props) => {
  return (
    <Pressable>
      <Ionicons name={iconName} onPress={onPress} size={24} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
