export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'beauty' | 'fashion' | 'home' | 'tech' | 'gifts';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  images: string[];
  description: string;
  features: string[];
  details: {
    origin?: string;
    materials?: string;
    dimensions?: string;
    shipping?: string;
  };
  variants?: {
    name: string;
    options: {
      label: string;
      value: string;
      colorHex?: string;
    }[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped';
  total: number;
  itemsCount: number;
  trackingNumber: string;
  items: {
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
}
