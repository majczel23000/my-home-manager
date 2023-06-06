import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryProductModel } from 'src/app/shared/models/shopping/category-products.model';
import { CategoryModel } from 'src/app/shared/models/shopping/category.model';
import { ProductModel, ShoppingListModel } from 'src/app/shared/models/shopping/shopping-list.model';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingListDetailsComponent implements OnInit, OnDestroy {

  protected subscriptions: Subscription[] = [];
  public isLoading = true;
  public shoppingList: ShoppingListModel = {};
  public addedProduct: ProductModel = {
    item: '',
    quantity: '',
    category: '',
    isAdded: false
  }
  public categories: CategoryModel[] = [];
  public elementsAndCategories: CategoryProductModel[] = [];

  constructor(
    protected shoppingListService: ShoppingListService,
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.getIdFromParameter();
  }

  protected getIdFromParameter(): void {
    const shoppingListId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!shoppingListId) {
      this.router.navigateByUrl('/shopping');
      return;
    }
    this.getShoppingListDetails(shoppingListId);
  }

  protected getShoppingListDetails(id: string): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingListById(id).subscribe(
        shoppingList => {
          this.shoppingList = shoppingList;
          this.getCategories();
        }
      )
    );
  }

  protected getCategories(): void {
    this.subscriptions.push(
      this.shoppingListService.getCategories().subscribe(
        categories => {
          this.categories = categories;
          this.createCategoriesWithProducts();
        }
      )
    );
  }

  protected createCategoriesWithProducts(): void {
    this.elementsAndCategories = [];
    this.categories.forEach(category => this.elementsAndCategories.push({
      category: category.name,
      elements: [],
    }));
    let id = 0;
    this.shoppingList.products?.forEach(product => {
      product.id = id++;
      this.elementsAndCategories.find(category => category.category === product.category)?.elements.push(product);
    });
    this.elementsAndCategories = this.elementsAndCategories.filter(element => element.elements?.length);
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  public addNewProduct(): void {
    if (this.isAddButtonDisabled()) {
      return;
    }
    const shoppingListToUpdate = Object.assign({}, this.shoppingList);
    shoppingListToUpdate.products!.push(this.addedProduct);
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      products: shoppingListToUpdate.products
    }).then(() => {
      this.addedProduct = { item: '', quantity: '', category: '', isAdded: false }
    });
  }

  public removeItem(event: any, i: number): void {
    event.preventDefault();
    event.stopPropagation();
    const shoppingListToUpdate = Object.assign({}, this.shoppingList);
    shoppingListToUpdate.products!.splice(i, 1);
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      products: shoppingListToUpdate.products
    });
  }

  public selectItem(i: number): void {
    this.shoppingList.products![i].isAdded = !this.shoppingList.products![i].isAdded;
    this.shoppingListService.updateShoppingList({
      id: this.shoppingList.id,
      products: this.shoppingList.products
    });
  }

  public isAddButtonDisabled(): boolean {
    return !this.addedProduct.item.length || !this.addedProduct.quantity.length || !this.addedProduct.category.length;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
