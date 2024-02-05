import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ShoppingListModel } from "src/app/shared/models/shopping/shopping-list.model";
import { ShoppingListService } from "src/app/shared/services/shopping/shopping-list.service";
import { mockShoppingLists } from "./shopping-lists-data-mock";
import { DocumentReference } from "@angular/fire/compat/firestore";
import { CategoryModel } from "src/app/shared/models/shopping/category.model";
import { mockCategories } from "./categories-mock";

@Injectable()
export class MockShoppingListService extends ShoppingListService {

  public data: ShoppingListModel[] = [];
  constructor() {
    super();
    this.data = JSON.parse(JSON.stringify(mockShoppingLists));
  }

  override getShoppingLists(): Observable<ShoppingListModel[]> {
    return of(this.data);
  }

  override deleteShoppingList(id: string): Promise<void> {
    this.data.splice(parseInt(id)
, 1);
    return Promise.resolve();
  }

  override createShoppingList(shoppingList: ShoppingListModel): Promise<void | DocumentReference<unknown>> {
    this.data.push(shoppingList);
    return Promise.resolve();
  }

  override getShoppingListById(id: string): Observable<ShoppingListModel> {
    return of(this.data.find(el => el.id === id)!);
  }

  override getCategories(): Observable<CategoryModel[]> {
    return of(mockCategories);
  }

  override updateShoppingList(shoppingList: ShoppingListModel): Promise<void> {
    const idx = this.data.findIndex(el => el.id === shoppingList.id);
    this.data[idx] = shoppingList;
    return Promise.resolve();
  }
}