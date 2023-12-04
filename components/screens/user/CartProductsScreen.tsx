import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import IconButton from "../../IconButton";

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
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  // 결제 완료 핸들러
  const handleCheckout = () => {
    Alert.alert("결제 완료", "결제가 완료되었습니다.");
  };

  const handleDeleteItem = (itemId: string) => {
    Alert.alert(
      "삭제 확인",
      "이 상품을 장바구니에서 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            // 아이템 삭제 로직
            const updatedList = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedList);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>수량: {item.quantity}</Text>
        <Text style={styles.itemSubtitle}>가격: ￦{item.price.toFixed(2)}</Text>
      </View>

      <IconButton
        iconName="close-outline"
        onPress={() => handleDeleteItem(item.id)}
        color="red"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>장바구니가 비어 있습니다.</Text>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          총 가격: ￦{calculateTotalPrice().toFixed(2)}
        </Text>
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
});

export default CartProductsScreen;
