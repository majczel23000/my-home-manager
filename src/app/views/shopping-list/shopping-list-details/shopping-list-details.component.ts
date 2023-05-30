import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListModel } from '../../../shared/models/shopping-list.model';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { CategoryProductModel } from 'src/app/shared/models/category-products.model';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingListDetailsComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public shoppingList: ShoppingListModel = {} as ShoppingListModel;
  private subscriptions: Subscription[] = [] as Subscription[];
  public addedProduct: { item: string; quantity: string; category: string; isAdded: boolean } = {
    item: '',
    quantity: '',
    category: '',
    isAdded: false
  }
  public categories: CategoryModel[] = [];
  public elementsAndCategories: CategoryProductModel[] = [] as CategoryProductModel[];

  constructor(
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getShoppingListDetails(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  private getShoppingListDetails(id: string): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingListById(id).subscribe(
        shoppingList => {
          this.shoppingList = shoppingList;
          this.getCategories();
        }
      )
    );
  }

  private getCategories(): void {
    this.subscriptions.push(
      this.shoppingListService.getCategories().subscribe(
        (categories: CategoryModel[]) => {
          this.categories = categories;
          this.createCategoriesWithProducts();
        }
      )
    );
  }

  private createCategoriesWithProducts(): void {
    this.elementsAndCategories = [];
    this.categories.forEach(category => this.elementsAndCategories.push({
      category: category.name,
      elements: [],
    }));
    let id = 0;
    this.shoppingList.elements?.forEach(element => {
      element.id = id++;
      this.elementsAndCategories.find(category => category.category === element.category)?.elements.push(element);
    });
    this.elementsAndCategories = this.elementsAndCategories.filter(element => element.elements?.length);
    console.log(this.elementsAndCategories);
    this.isLoading = false;
    this.cdr.detectChanges();
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
      this.addedProduct = { item: '', quantity: '', category: '', isAdded: false }
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
    return !this.addedProduct.item.length || !this.addedProduct.quantity.length || !this.addedProduct.category.length;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
