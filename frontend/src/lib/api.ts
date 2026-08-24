// src/lib/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getProductBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const createOrder = async (orderData: any) => {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
};

export const submitContact = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
  return response.json();
};