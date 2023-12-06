import { QueryClient } from "@tanstack/react-query";

export interface User {
  uid: string;
  displayName: string;
  email: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string|number;
  imgs: string[];
  color?: string;
  size?: string;
  brand?: string;
  inventory?: number;
  like?: number;
  quantity?: number;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Admin: undefined;
  Tab: undefined;
  Account: undefined;
  Like: undefined;
  Cart: undefined;
  Detail: {
    item: Product;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Account: undefined;
  Detail: {
    item: Product;
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

export { queryClient };
