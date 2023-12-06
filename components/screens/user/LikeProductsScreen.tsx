import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import IconButton from "../../IconButton";
import useUserInteractedItemsQuery from "../../hooks/useUserLikeQuery";
import { currentUserState } from "../../../src/atom/currentUserState";
import { useRecoilValue } from "recoil";
import { Product } from "../../../src/static/const/type";
import useProductQuery from "../../hooks/useProductQuery";

type Props = {};

const LikeProductsScreen = (props: Props) => {
  const user = useRecoilValue(currentUserState);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const { data, isLoading, isError, refetch, isFetching, isFetchedAfterMount } =
    useUserInteractedItemsQuery(user?.uid || "", "likedProducts");
  const { updateProductMutation } = useProductQuery();

  useEffect(() => {
    refetch();
    // if (data) {
    //   setFilteredProducts(data);
    // }
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

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

            // 비동기 삭제가 안되기에 이렇게 상태처리
            if (filteredProducts) {
              const updatedList = filteredProducts.filter(
                (item) => item.id !== itemId
              );
              setFilteredProducts(updatedList);
            }

            updateProductMutation.mutate({
              uid: user!.uid,
              pid: itemId,
              mode: "likedProducts",
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading || isFetching) {
    return <ActivityIndicator />;
  }

  if (isError) {
    console.log("에러가 발생했습니다");
  }

  const renderLikeItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imgs[0] }} style={styles.itemImage} />

      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemDetailText}>￦{item.price}</Text>

      <IconButton
        iconName="heart"
        color="red"
        onPress={() => handleDeleteItem(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
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
  itemDetailText: {
    fontSize: 12,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
