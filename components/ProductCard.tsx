import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Product } from "../src/static/const/type";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  item: Product;
};

const ProductCard = ({ onPress, item }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: item.imgs[0] }} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.category}</Text>
        <Text style={styles.price}>{item.price}원</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="heart" color="red" />
          <Text style={{ color: "red" }}>{item.like}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contentContainer: {
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
