import React from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProduct,
  getAllProductData,
} from "../../src/utils/functions/productManage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "getAllProduct";
const useProductQuery = () => {
  const query = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllProductData,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  return { isPending, isError, data, error, deleteProductMutation };
};

export default useProductQuery;
