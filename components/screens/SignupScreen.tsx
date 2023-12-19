// SignupScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../api/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { RootStackParamList } from "../../src/static/const/type";
import {
  convertUrIToBlob,
  downloadBasicProfileImage,
  uploadProfileImage,
  uploadStringProfileImage,
} from "@components/api/firebase/storage/storage";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("빈 값이 있습니다!");
      return;
    }

    try {
      const credentail = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uploadBasicImage = async () => {
        try {
          const imageUrl = await downloadBasicProfileImage();
          const blob = await convertUrIToBlob(imageUrl);
          uploadStringProfileImage(blob, credentail.user.uid);
          console.log(imageUrl);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      };
      uploadBasicImage();

      alert("회원가입 완료!");
      signOut(auth);
      navigation.navigate("Login");
    } catch (e) {
      const a = e as FirebaseError;
      console.log(a.code);
    }
    navigation.navigate("Login");
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

      <Button title="Signup" onPress={handleSignup} />
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
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default SignupScreen;
