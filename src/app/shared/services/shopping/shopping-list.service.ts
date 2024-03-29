import { Injectable, inject } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { ShoppingListModel } from '../../models/shopping/shopping-list.model';
import { CategoryModel } from '../../models/shopping/category.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  protected firestore = inject(AngularFirestore);

  // Get all shopping lists
  getShoppingLists(): Observable<ShoppingListModel[]> {
    return this.firestore.collection('shopping-lists').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...(c.payload.doc.data() as ShoppingListModel) }))
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

  // Create new shopping list
  createShoppingList(shoppingList: ShoppingListModel): Promise<void | DocumentReference<unknown>> {
    return this.firestore.collection('shopping-lists').add(shoppingList).then(ref => {
      ref.set({ id: ref.id }, { merge: true });
    });
  }

  // Delete shopping list
  deleteShoppingList(id: string): Promise<void> {
    return this.firestore.collection('shopping-lists').doc(id).delete();
  }

  // Get all categories (sorted)
  getCategories(): Observable<CategoryModel[]> {
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({id: c.payload.doc.id, ...(c.payload.doc.data() as CategoryModel)}))
        .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }
}
