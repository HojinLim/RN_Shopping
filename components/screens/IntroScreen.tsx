import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { currentUserState } from "../../src/atom/currentUserState";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebase/firebase";
import { Product, User } from "../../src/static/const/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HJ_USER } from "../../src/static/const/variable";
import { removeUserData, saveUserData } from "../../src/utils/functions/user";
import { getAllData } from "../../src/utils/functions/productManage";
import ProductCard from "../ProductCard";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

const IntroScreen = (props: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getAllData();

        if (productData.length) {
          setProducts(productData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const curretUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          created_at: user.metadata.creationTime,
        } as User;

        // AsyncStorage.setItem(HJ_USER, JSON.stringify(curretUser));
        saveUserData(HJ_USER, JSON.stringify(curretUser));
        setCurrentUser(curretUser);
      } else {
        removeUserData(HJ_USER);
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" />}
      <Text>
        {currentUser
          ? currentUser?.email + "님, 안녕하세요!"
          : "로그인 정보 없음"}
      </Text>
      <View style={styles.productsContainer}>
        <ScrollView>
          {products.map((item: Product, key: number) => (
            <ProductCard item={item} key={key} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  productsContainer: {
    padding: 15,
  },
});
