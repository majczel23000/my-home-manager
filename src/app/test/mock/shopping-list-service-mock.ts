import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ShoppingListModel } from "src/app/shared/models/shopping/shopping-list.model";
import { ShoppingListService } from "src/app/shared/services/shopping/shopping-list.service";
import { mockShoppingLists } from "./shopping-lists-data-mock";

@Injectable()
export class MockShoppingListService extends ShoppingListService {
  override getShoppingLists(): Observable<ShoppingListModel[]> {
    return of(mockShoppingLists);
  }
  
  override deleteShoppingList(id: string): Promise<void> {
    mockShoppingLists.splice(parseInt(id), 1);
    return Promise.resolve();
  }
}