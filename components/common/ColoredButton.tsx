import { Pressable, StyleSheet, Text } from "react-native";
import React, { ReactNode } from "react";

interface ColorButtonProps {
  color: string;
  children: ReactNode;
  onPressed: () => void;
}

const ColoredButton = ({ color, children, onPressed }: ColorButtonProps) => {
  const buttonStyles = {
    ...styles.button,
    backgroundColor: color,
  };

  const pressedButtonStyles = {
    ...buttonStyles,
    opacity: 0.75,
  };

  return (
    <Pressable
      onPress={onPressed}
      style={({ pressed }) =>
        pressed ? [buttonStyles, pressedButtonStyles] : buttonStyles
      }
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ColoredButton;
