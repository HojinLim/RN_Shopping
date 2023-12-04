import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import HomeScreen from "./components/screens/HomeScreen";
import AdminScreen from "./components/screens/AdminScreen";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RecoilRoot } from "recoil";
import IconButton from "./components/IconButton";
import { signOut } from "./src/utils/functions/user";
import { View } from "react-native";
import AccountScreen from "./components/screens/AccountScreen";
import DetailProductScreen from "./components/screens/DetailProductScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RootStackParamList,
  RootTabParamList,
  queryClient,
} from "./src/static/const/type";
import LikeProductsScreen from "./components/screens/user/LikeProductsScreen";
import CartProductsScreen from "./components/screens/user/CartProductsScreen";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const IntroHeaderRightButton = ({ navigation }: { navigation: any }) => (
  <View style={{ flexDirection: "row" }}>
    <IconButton
      iconName="log-in-outline"
      onPress={() => navigation.replace("Admin")}
      color="black"
    />
    <IconButton iconName="log-out-outline" onPress={signOut} color="black" />
  </View>
);

const TabNavigator = ({ navigation }: { navigation: any }) => {
  // 바로 이부분
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <IconButton
            iconName="home-outline"
            onPress={() => navigation.navigate("Home")}
            color="black"
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // 탭 아이콘
          tabBarIcon: ({ color, size }) => (
            <IconButton
              iconName="home-outline"
              onPress={() => {}}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => (
            <IconButton
              iconName="person-circle-outline"
              onPress={() => {}}
              color="black"
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={({
              navigation,
            }: {
              navigation: StackNavigationProp<RootStackParamList>;
            }) => ({
              headerRight: () => (
                <IconButton
                  iconName="home-outline"
                  onPress={() => navigation.navigate("Home")}
                  color="black"
                />
              ),
            })}
          >
            <Stack.Screen
              name="Tab"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="Admin"
              component={AdminScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <IntroHeaderRightButton navigation={navigation} />
                ),
              })}
            />
            <Stack.Screen name="Detail" component={DetailProductScreen} />
            <Stack.Screen name="Like" component={LikeProductsScreen} />
            <Stack.Screen name="Cart" component={CartProductsScreen} />
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
