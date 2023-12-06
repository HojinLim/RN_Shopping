import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState } from "../../src/atom/currentUserState";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase/firebase";
import {
  Product,
  RootStackParamList,
  RootTabParamList,
  User,
} from "../../src/static/const/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HJ_USER } from "../../src/static/const/variable";
import { removeUserData, saveUserData } from "../../src/utils/functions/user";
import { getAllProductData } from "../../src/utils/functions/productManage";
import ProductCard from "../ProductCard";
import { ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";

import useProductQuery from "../hooks/useProductQuery";
import MenuHeader from "../MenuHeader";
import { currentCategory } from "../../src/atom/currentCategory";

type Props = {};
type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const curretCategory = useRecoilValue(currentCategory);
  const [filteredData, setFilteredData] = useState<Product[] | undefined>([]);

  const { isError, data, error, isLoading } = useProductQuery();

  useEffect(() => {
    if (curretCategory == "전체") {
      console.log(filteredData);
      setFilteredData(data);
      return;
    }
    if (!isError) {
      const arr = data?.filter((arr) => arr.category == curretCategory);
      setFilteredData(arr);
    }
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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError || error) {
    return <Text>Error: {error!.message}</Text>;
  }

  return (
    <View style={styles.outerContainer}>
      <MenuHeader />

      <View style={styles.productsContainer}>
        <ScrollView>
          {filteredData?.map((item: Product, key: number) => (
            <ProductCard
              key={key}
              item={item}
              onPress={() => {
                navigation.navigate("Detail", { item });
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
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
    marginBottom: 50,
  },
});
