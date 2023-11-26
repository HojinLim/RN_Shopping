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
  price: number;
  imgs: string[];
  color?: string;
  size?: string;
  brand?: string;
  inventory?: number;
}