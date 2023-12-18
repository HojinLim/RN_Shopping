import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootStackParamList } from "../../src/static/const/type";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const TestScreen = (props: Props) => {
  const navi = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Button
        onPress={() => {
          navi.navigate("Admin");
        }}
        title="이동"
      />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
