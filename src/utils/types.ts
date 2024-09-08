export interface ProductVariant {
    id: string;
    product_id: string;
    title: string;
    price: string;
  }
  
  export interface ProductImage {
    id: string;
    product_id: string;
    src: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    variants: ProductVariant[];
    image: ProductImage;
    discount: number;
    isPercentageDiscount: boolean;
  }