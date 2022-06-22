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
          console.log(shoppingList);
          this.shoppingList = shoppingList;
          this.cdr.detectChanges();
        }
      )
    );
  }

  updateShoppingList(): void {
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      name: 'new name',
    });
  }

  addNewProduct(): void {
    const copiedShoppingList = Object.create(this.shoppingList);
    copiedShoppingList.elements.push(this.addedProduct);
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      elements: copiedShoppingList.elements
    }).then(() => {
      this.addedProduct = { item: '', quantity: '', isAdded: false }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
