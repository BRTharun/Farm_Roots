import { Category } from "./category.model";

export interface Subcategory {
  subCategoryId: number;
  subCategoryName: string;
  categoryId: number;
  imageUrl: string;
  category: any;
}
