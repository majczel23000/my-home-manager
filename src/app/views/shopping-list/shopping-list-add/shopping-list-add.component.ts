import { Component } from '@angular/core';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { ShoppingListModel } from '../../../shared/models/shopping-list.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.scss']
})
export class ShoppingListAddComponent {

  public addedShoppingList: ShoppingListModel = {
    description: '',
    name: ''
  };

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
  ) { }

  public addNewShoppingList(): void {
    this.shoppingListService.createShoppingList({
      description: this.addedShoppingList.description,
      name: this.addedShoppingList.name,
      elements: []
    }).then(() => {
      this.router.navigateByUrl('/lists');
    });
  }

  public isAddButtonDisabled(): boolean {
    return !this.addedShoppingList.description!.length || !this.addedShoppingList.name!.length;
  }

}
