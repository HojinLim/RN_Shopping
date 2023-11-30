import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Product, RootStackParamList } from "../src/static/const/type";
import { deleteProduct } from "../src/utils/functions/productManage";
import { StackScreenProps } from "@react-navigation/stack";

type Props = {
  item: Product;
};

type NavigationProps = StackScreenProps<RootStackParamList, "Detail">;

const ProductCard = ({ item, navigation }: Props & NavigationProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", {
            id: item.id,
            imgs: item.imgs,
            name: item.name,
            price: item.price,
            category: item.category,
            like: item.like ?? 0,
          });
        }}
      >
        <Image style={styles.image} source={{ uri: item.imgs[0] }} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>

        <Text style={styles.title}>{item.category}</Text>
        <Text style={styles.price}>{item.price}원</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteProduct(item.id)}
      >
        <Text>삭제테스트</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 3,
    marginTop: 6,
    marginBottom: 25,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#666",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    alignSelf: "center",
    margin: 10,
  },
});

export default ProductCard;
