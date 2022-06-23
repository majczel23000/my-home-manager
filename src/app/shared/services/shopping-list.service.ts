import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { ShoppingListModel } from '../models/shopping-list.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  // Get all shopping lists
  getShoppingLists(): Observable<ShoppingListModel[]> {
    return this.firestore.collection('shopping-lists').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            id: c.payload.doc.id, ...(c.payload.doc.data() as ShoppingListModel)})
        )
      )
    );
  }

  // Get specific shopping list
  getShoppingListById(id: string): Observable<ShoppingListModel> {
    return this.firestore.collection('shopping-lists').doc(id).snapshotChanges().pipe(
      map(changes => {
        return { id: changes.payload.id, ...changes.payload.data() as ShoppingListModel }
      })
    )
  }

  // Update shopping list
  updateShoppingList(shoppingList: ShoppingListModel): Promise<void> {
    return this.firestore.collection('shopping-lists').doc(shoppingList.id).set(shoppingList, { merge: true });
  }
}
