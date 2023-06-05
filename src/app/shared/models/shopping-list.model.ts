export interface ShoppingListModel {
  id?: string;
  name?: string;
  description?: string;
  products?: ProductModel[];
}

export interface ProductModel {
  isAdded: boolean;
  item: string;
  quantity: string;
  category: string;
  id?: number;
}
