import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { ShoppingListSingleElementComponent } from './shopping-list-single-element/shopping-list-single-element.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListAddComponent } from './shopping-list-add/shopping-list-add.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListDetailsComponent,
    ShoppingListItemComponent,
    ShoppingListSingleElementComponent,
    ShoppingListAddComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class ShoppingListModule { }
