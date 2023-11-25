import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import IntroScreen from "./components/screens/IntroScreen";
import { RecoilRoot } from "recoil";
import IconButton from "./components/IconButton";
import { signOut } from "./src/utils/functions";
import { View } from "react-native";
import AdminScreen from "./components/screens/AdminScreen";

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Signup: undefined;
  Admin: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const IntroHeaderRightButton = ({ navigation }: { navigation: any }) => (
  <View style={{ flexDirection: "row" }}>
    <IconButton
      iconName="log-in-outline"
      onPress={() => navigation.replace("Login")}
    />
    <IconButton iconName="log-out-outline" onPress={signOut} />
  </View>
);

const ToHomeRightButton = ({ navigation }: { navigation: any }) => (
  <IconButton
    iconName="home-outline"
    onPress={() => navigation.replace("Intro")}
  />
);

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={({ navigation }) => ({
            headerRight: () => <ToHomeRightButton navigation={navigation} />,
          })}
        >
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <IntroHeaderRightButton navigation={navigation} />
              ),
            })}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
