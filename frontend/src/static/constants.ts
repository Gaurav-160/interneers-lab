export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  quantity: string;
  updated_at: Date;
  created_at: Date;
};

export type Category = {
  id: string;
  title: string;
  description: string;
};

const baseUrl = "http://127.0.0.1:8000";

export { baseUrl };
