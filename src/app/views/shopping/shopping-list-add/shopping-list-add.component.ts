import { Component, inject } from '@angular/core';
import { ShoppingListService } from '../../../shared/services/shopping/shopping-list.service';
import { ShoppingListModel } from '../../../shared/models/shopping/shopping-list.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.scss']
})
export class ShoppingListAddComponent {

  protected shoppingListService = inject(ShoppingListService);

  public shoppingListToAdd: ShoppingListModel = {
    description: '',
    name: ''
  };

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
