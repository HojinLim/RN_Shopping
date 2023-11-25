import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  iconName: any;
};

const IconButton = (props: Props) => {
  return (
    <Pressable>
      <Ionicons name={props.iconName} onPress={props.onPress} size={24} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
