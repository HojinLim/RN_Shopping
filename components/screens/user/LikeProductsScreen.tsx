import { Alert, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import IconButton from "../../IconButton";

type Props = {};

const LikeProductsScreen = (props: Props) => {
  const [likedProducts, setLikedProducts] = useState([
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
    { id: "3", name: "Product 3" },
  ]);

  const handleDeleteItem = (itemId: string) => {
    Alert.alert(
      "삭제 확인",
      "이 상품을 좋아요 목록에서 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            // 아이템 삭제 로직
            const updatedList = likedProducts.filter(
              (item) => item.id !== itemId
            );
            setLikedProducts(updatedList);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderLikeItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
        <IconButton iconName="heart" onPress={() => {}} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={likedProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderLikeItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>좋아요한 상품이 없습니다.</Text>
        }
      />
    </View>
  );
};

export default LikeProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
