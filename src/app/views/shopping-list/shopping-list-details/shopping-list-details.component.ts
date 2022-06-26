import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListModel } from '../../../shared/models/shopping-list.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingListDetailsComponent implements OnInit, OnDestroy {

  public shoppingList: ShoppingListModel = {} as ShoppingListModel;
  private subscriptions: Subscription[] = [] as Subscription[];
  public addedProduct: { item: string; quantity: string; isAdded: boolean } = {
    item: '',
    quantity: '',
    isAdded: false
  }

  constructor(
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getShoppingListDetails(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getShoppingListDetails(id: string): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingListById(id).subscribe(
        shoppingList => {
          this.shoppingList = shoppingList;
          this.cdr.detectChanges();
        }
      )
    );
  }

  addNewProduct(): void {
    if (this.isAddButtonDisabled()) {
      return;
    }
    const copiedShoppingList = Object.assign({}, this.shoppingList);
    copiedShoppingList.elements!.push(this.addedProduct);
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      elements: copiedShoppingList.elements
    }).then(() => {
      this.addedProduct = { item: '', quantity: '', isAdded: false }
    });
  }

  removeItem(event: any, i: number): void {
    event.preventDefault();
    event.stopPropagation();
    const copiedShoppingList = Object.assign({}, this.shoppingList);
    copiedShoppingList.elements!.splice(i, 1);
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      elements: copiedShoppingList.elements
    });
  }

  selectItem(i: number): void {
    this.shoppingList.elements![i].isAdded = !this.shoppingList.elements![i].isAdded;
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      elements: this.shoppingList.elements
    });
  }

  isAddButtonDisabled(): boolean {
    return !this.addedProduct.item.length || !this.addedProduct.quantity.length;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
