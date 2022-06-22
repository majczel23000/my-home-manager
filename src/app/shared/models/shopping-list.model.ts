export class ShoppingListModel {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  elements?: [
    {
      isAdded: boolean;
      item: string;
      quantity: string;
    }
  ];
}
