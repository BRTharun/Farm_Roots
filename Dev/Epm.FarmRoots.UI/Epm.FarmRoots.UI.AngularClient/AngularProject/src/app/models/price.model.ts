// src/app/models/price.model.ts
export interface Price {
  priceId: number;
  salePrice: number;
  mrp: number;
  specialPrice?: number;
  fromDate?: Date;
  toDate?: Date;
  discount: number;
  productCost: number;
  isBuyButtonDisabled: boolean;
  productId: number;
}
