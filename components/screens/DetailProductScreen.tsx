import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../src/static/const/type";

type props = StackScreenProps<RootStackParamList, "Detail">;

const DetailProductScreen = ({ navigation, route }: props) => {
  const { id, category, name, price, imgs, like } = route.params; // 제품 데이터는 navigation으로 전달됨

  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleLikePress = () => {
    // 좋아요 버튼이 눌렸을 때의 로직
    setLiked(!liked);
  };

  const handleAddToCartPress = () => {
    // 장바구니 추가 버튼이 눌렸을 때의 로직
    setAddedToCart(true);
    // 추가된 항목을 서버에 업데이트하거나 다른 작업 수행
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgs[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.price}>가격: {price}￦</Text>
        <Text style={styles.likes}>좋아요: {like}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.likeButton,
            { backgroundColor: liked ? "red" : "gray" },
          ]}
          onPress={handleLikePress}
        >
          <Text style={styles.buttonText}>
            {liked ? "좋아요 취소" : "좋아요"}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.addToCartButton,
            { backgroundColor: addedToCart ? "green" : "blue" },
          ]}
          onPress={handleAddToCartPress}
        >
          <Text style={styles.buttonText}>
            {addedToCart ? "장바구니에 추가됨" : "장바구니에 추가"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  likes: {
    fontSize: 16,
    color: "green",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeButton: {
    flex: 1,
    backgroundColor: "gray",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "blue",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
