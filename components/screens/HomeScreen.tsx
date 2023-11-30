import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../src/atom/currentUserState";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebase/firebase";
import { Product, User } from "../../src/static/const/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HJ_USER } from "../../src/static/const/variable";
import { removeUserData, saveUserData } from "../../src/utils/functions/user";
import { getAllProductData } from "../../src/utils/functions/productManage";
import ProductCard from "../ProductCard";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { RouteProp } from "@react-navigation/native";
import useProductQuery from "../hooks/useProductQuery";
import MenuHeader from "../MenuHeader";
import { currentCategory } from "../../src/atom/currentCategory";

type Props = {
  route: RouteProp<RootStackParamList, "Home">;
  navigation: StackNavigationProp<RootStackParamList, "Home", undefined>;
};

const HomeScreen = (props: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const curretCategory = useRecoilValue(currentCategory);
  const [filteredData, setFilteredData] = useState([]);
  type props = StackScreenProps<RootStackParamList, "Home">;

  const { isPending, isError, data, error } = useProductQuery();
  useEffect(() => {
    if (curretCategory == "전체") {
      setFilteredData(data);
      return;
    }
    const arr = data?.filter((arr) => arr.category == curretCategory);

    setFilteredData(arr);
  }, [curretCategory, data]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const curretUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          created_at: user.metadata.creationTime,
        } as User;

        saveUserData(HJ_USER, JSON.stringify(curretUser));
        setCurrentUser(curretUser);
      } else {
        removeUserData(HJ_USER);
        setCurrentUser(null);
      }
    });
  }, []);

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (isError || error) {
    return <Text>Error: {error!.message}</Text>;
  }

  return (
    <View>
      <MenuHeader />
      <Text>
        {currentUser
          ? currentUser?.email + "님, 안녕하세요!"
          : "로그인 정보 없음"}
      </Text>
      <View style={styles.productsContainer}>
        <ScrollView>
          {!isPending &&
            data?.map((item: Product, key: number) => (
              <ProductCard
                key={key}
                item={item}
                route={props.route}
                navigation={props.navigation}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#3498db",
    paddingHorizontal: 16,
    flex: 1,
  },
  productsContainer: {
    padding: 15,

  },
});
