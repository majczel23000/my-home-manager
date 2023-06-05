import { Component } from '@angular/core';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { ShoppingListModel } from '../../../shared/models/shopping-list.model';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.scss']
})
export class ShoppingListAddComponent {

  public shoppingListToAdd: ShoppingListModel = {
    description: '',
    name: ''
  };

  constructor(
    protected shoppingListService: ShoppingListService,
  ) { }

  public addNewShoppingList(): void {
    this.shoppingListService.createShoppingList({
      description: this.shoppingListToAdd.description,
      name: this.shoppingListToAdd.name,
      products: []
    });
  }

  public isAddButtonDisabled(): boolean {
    return !this.shoppingListToAdd.description!.length || !this.shoppingListToAdd.name!.length;
  }

}
