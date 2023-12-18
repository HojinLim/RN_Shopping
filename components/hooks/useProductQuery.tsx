import React from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useRecoilValue } from "recoil";

import { currentPushedLike } from "../../src/atom/currentPushedLike";
import { currentUserState } from "../../src/atom/currentUserState";
import {
  addProduct,
  deleteProduct,
  getAllProductData,
} from "../api/fireStore/dataManage";
import { changeProductState } from "../api/fireStore/userInteract";
import { Product } from "../../src/static/const/type";

export const ALL_PRODUCT_QUERY_KEY = "getAllProduct";

const useProductQuery = () => {
  const queryClient = useQueryClient();
  const isPushed = useRecoilValue(currentPushedLike);

  const user = useRecoilValue(currentUserState);
  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [ALL_PRODUCT_QUERY_KEY],
    queryFn: getAllProductData,
  //  queryClient.removeQueries({ queryKey: "A" })
    // staleTime: 60 * 1000,
  });
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    },
  });

  const updateBasketMutation = useMutation({
    mutationFn: changeProductState,

    onSuccess: async () => {
      
      await queryClient.invalidateQueries({
        queryKey: [ALL_PRODUCT_QUERY_KEY],
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: changeProductState,
    onMutate: async (newData) => {
    
      await queryClient.cancelQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });

      // 이전 값
      const previousData = queryClient.getQueryData([ALL_PRODUCT_QUERY_KEY]);

      // 새로운 값으로 *낙관적 업데이트* 진행
      queryClient.setQueryData(
        [ALL_PRODUCT_QUERY_KEY],
        (oldData: Product[]) => {
          // isPushed 가 true이면 -1 아니면 +1
          const updatedData = oldData.map((product: Product) => {
            if (product.id === newData.pid) {
              return {
                ...product,
                like: isPushed ? product.like ?? 0 - 1 : product.like ?? 0 + 1,
              };
            }
            return product;
          });

          // 값이 들어있는 context 객체를 반환
          return updatedData;
        }
      );

      // 값이 들어있는 context 객체를 반환
      return { previousData, newData };
    },
    // mutation이 실패하면 onMutate에서 반환된 context를 사용하여 롤백 진행
    onError(error, newData, context: any) {
      queryClient.setQueryData([ALL_PRODUCT_QUERY_KEY], context.previousData);
    },
    // 오류 또는 성공 후에는 항상 refetch
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ALL_PRODUCT_QUERY_KEY],
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    },
    onSettled: () => {},
  });

  return {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    addProductMutation,
    updateProductMutation,
    deleteProductMutation,
    updateBasketMutation,
  };
};

export default useProductQuery;
