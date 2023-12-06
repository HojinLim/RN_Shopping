import { useQuery } from "@tanstack/react-query";
import { getUserInteractedItems } from "../api/fireStore/dataManage";


export const USER_ITEMS_QUERY_KEY = "userLikes";

const useUserInteractedItemsQuery = (
  uid: string,
  mode: "likedProducts" | "addedProducts"
) => {
  return useQuery({
    queryKey: [USER_ITEMS_QUERY_KEY, { id: uid, type: mode }],
    queryFn: () => getUserInteractedItems({ uid, mode }),
  });
};

export default useUserInteractedItemsQuery;
