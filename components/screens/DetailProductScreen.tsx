import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../src/static/const/type";
import {
  changeProductState,
  hasPushedLike,
} from "../api/fireStore/userInteract";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../src/atom/currentUserState";
import IconButton from "../IconButton";
import useProductQuery from "../hooks/useProductQuery";
import { debounce } from "lodash";

type DetailScreenProps = StackScreenProps<RootStackParamList, "Detail">;
const DetailProductScreen = ({ navigation, route }: DetailScreenProps) => {
  const { id: pid, name, category, price, like, imgs } = route.params.item;

  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const { updateProductMutation } = useProductQuery();

  // 좋아요 클릭 핸들러
  const handleLikePress = () => {
    // 로그인 상태면

    if (currentUser) {
      updateProductMutation.mutate({
        uid: currentUser?.uid,
        pid,
        mode: "likedProducts",
      });

      setIsLiked((prev) => !prev);
      // 로그인 상태 아니면, 로그인 화면으로
    } else navigation.navigate("Login");
  };

  useEffect(() => {
    hasPushedLike(currentUser?.uid!, pid, "likedProducts").then((isPushed) => {
      try {
        if (isPushed) {
          setIsLiked(isPushed);
        }
      } catch {}
    });

    // 첫 랜더링 시 장바구니 여부 확인
    if (currentUser) {
      hasPushedLike(currentUser?.uid!, pid!, "addedProducts").then((pushed) => {
        try {
          console.log(pushed!!);
          setAddedToCart(pushed ?? false);
        } catch {}
      });
    }
  }, []);

  const { updateBasketMutation } = useProductQuery();

  const handleAddToCartPress = (pid: string) => {
    // 장바구니 추가 버튼이 눌렸을 때의 로직

    if (currentUser) {
      if (!addedToCart) {
        updateBasketMutation.mutate({
          uid: currentUser?.uid,
          pid,
          mode: "addedProducts",
        });

        setAddedToCart(true);
      }
    } else {
      navigation.navigate("Login");
    }
    // 추가된 항목을 서버에 업데이트하거나 다른 작업 수행
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgs[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.price}>가격: {price}￦</Text>
        {/* <Text style={styles.likes}>좋아요: {like}</Text> */}
      </View>
      <View style={styles.buttonContainer}>
        <IconButton
          iconName="heart"
          onPress={debounce(handleLikePress, 250)}
          color={isLiked ? "red" : "black"}
        />

        <Pressable
          style={[
            styles.addToCartButton,
            { backgroundColor: addedToCart ? "green" : "blue" },
          ]}
          onPress={() => handleAddToCartPress(pid)}
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    margin: 10,
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
