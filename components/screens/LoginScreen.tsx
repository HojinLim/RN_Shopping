// LoginScreen.js

import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase/firebase";
import { ADMIN_ID, ADMIN_PASS } from "@env";
import { RootStackParamList } from "../../src/static/const/type";

type loginScreenProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<loginScreenProp>();

  type Props = {};
  const isAdmin = () => {
    if (email == ADMIN_ID && password == ADMIN_PASS) {
      alert("안녕하세요. 관리자님!");
      navigation.navigate("Admin");
      return true;
    } else return false;
  };
  const handleLogin = async (props: Props) => {
    if (isAdmin()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("로그인 완료!");
      navigation.navigate("Home");
    } catch (error) {
      alert("로그인 실패!");
      console.error("Error signing in:", error);
      return;
    }
  };

  const goSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Signup" onPress={goSignup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default LoginScreen;
