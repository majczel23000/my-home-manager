export class ShoppingListModel {
  id?: string;
  name?: string;
  description?: string;
  elements?: {
    isAdded?: boolean;
    item?: string;
    quantity?: string;
  }[];
}
