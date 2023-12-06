import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";

import IconButton from "../../IconButton";
import useUserInteractedItemsQuery from "../../hooks/useUserLikeQuery";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../src/atom/currentUserState";
import { Product } from "../../../src/static/const/type";
import { comma, uncomma } from "../../../src/utils/functions/number";
import useProductQuery from "../../hooks/useProductQuery";

const CartProductsScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Product 1",

      quantity: 2,
      price: 20.0,
    },
    {
      id: "2",
      name: "Product 2",

      quantity: 1,
      price: 15.0,
    },
    {
      id: "3",
      name: "Product 3",
      quantity: 3,
      price: 25.0,
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const user = useRecoilValue(currentUserState);
  const { data, isLoading, isError, refetch, isFetching, isPending } =
    useUserInteractedItemsQuery(user?.uid || "", "addedProducts");
  const { updateBasketMutation } = useProductQuery();
  const [total, setTotal] = useState("");

  const makeTotal = () => {
    const sum = filteredProducts?.reduce((acc, cur) => {
      const price = parseInt(uncomma(cur.price as string));
      return acc + price;
    }, 0);

    setTotal(comma(sum + ""));
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
    if (filteredProducts !== null) {
      makeTotal();
    }
  }, [data]); //data, filteredProducts

  if (isLoading || isFetching || isPending) {
    return <ActivityIndicator />;
  }

  if (isError) {
    Alert.alert("에러가 발생했습니다");
  }

  // const calculateTotalPrice = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   );
  // };
  // 결제 완료 핸들러
  const handleCheckout = () => {
    Alert.alert("결제 완료", "결제가 완료되었습니다.");
  };

  const handleDeleteItem = (itemId: string, name: string) => {
    Alert.alert(
      "삭제 확인",
      "이 상품을 장바구니에서 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            // 아이템 삭제 로직
            updateBasketMutation.mutate({
              uid: user!.uid,
              pid: itemId,
              mode: "addedProducts",
            });

            Alert.alert(name, "삭제완료");
            const updatedList = filteredProducts.filter(
              (item) => item.id !== itemId
            );
            setFilteredProducts(updatedList);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const minusQuantity = (id: string) => {
    // filteredProducts에서 해당 아이디를 가진 제품을 찾아서 quantity를 1 감소시킵니다.
    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity! - 1) }
          : product
      )
    );
  };
  const plusQuantity = () => {};

  const renderCartItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imgs[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>수량: {item.quantity}</Text>

        <Text style={styles.itemSubtitle}>가격: ￦{item.price}</Text>
      </View>
      <View style={styles.changeQuantityContainer}>
        <IconButton
          iconName="remove"
          color="black"
          onPress={() => minusQuantity(item.id)}
        />
        <Text style={styles.quantityText}>0</Text>

        <IconButton iconName="add" color="black" onPress={plusQuantity} />
      </View>

      <IconButton
        iconName="close-outline"
        onPress={() => handleDeleteItem(item.id, item.name)}
        color="red"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>장바구니가 비어 있습니다.</Text>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>총 가격: ￦{total}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>결제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },

  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  changeQuantityContainer: {
    flexDirection: "row",
  },
  quantityText: {
    borderColor: "black",
    borderWidth: 0.5,
    textAlign: "center",
    padding: 2,
  },
});

export default CartProductsScreen;
