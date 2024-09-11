export interface ResponseProduct {
  productId: number;
  createdDate?: Date;
  updatedDate?: Date;
  productType: string;
  published: boolean;
  productName: string;
  shortDescription: string;
  fullDescription?: string;
  productCondition: string;
  productTags: string[];
  vendorId: number; 
}
export interface CreateProduct {
  productType: string;
  published: boolean;
  productName: string;
  shortDescription: string;
  fullDescription?: string;
  productCondition: string;
  productTags: string[];
  vendorId: number;
}
