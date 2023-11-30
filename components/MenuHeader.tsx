import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { currentCategory } from "../src/atom/currentCategory";

type Props = {};

const MenuHeader = (props: Props) => {
  const setCategory = useSetRecoilState(currentCategory);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleButtonPress = (category: string) => {
    setCategory(category);
    setSelectedCategory(category);
    console.log(category);
  };

  return (
    <View style={styles.header}>
      {["전체", "상의", "하의", "액세서리"].map((category) => (
        <Pressable
          key={category}
          style={({ pressed }) => [
            styles.buttonContainer,
            selectedCategory === category && pressed && styles.pressedButton,
          ]}
          onPress={() => handleButtonPress(category)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === category && {
                textDecorationLine: "underline",
              },
            ]}
          >
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default MenuHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#3498db",
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  pressedButton: {
    opacity: 0.75,
  },
});
