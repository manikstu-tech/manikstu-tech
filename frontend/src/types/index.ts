// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  // Additional product fields as needed
}

export interface ProductResponse {
  data: Product[];
  meta: {
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  // Additional order fields as needed
}

export interface OrderResponse {
  data: Order;
  meta: {
    // Order-specific meta if needed
  };
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  enquiryType: string;
  message: string;
}

export interface JoinHandsFormData {
  mobile: string;
  project: string;
  state: string;
}

export interface TrainingFormData {
  mobile: string;
  trainingType: string;
  state: string;
}

export interface OrderCreateData {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  totalAmount: number;
  // Additional order fields as needed
}