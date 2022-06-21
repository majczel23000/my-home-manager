import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../shared/services/shopping-list.service';
import { ShoppingListModel } from '../../shared/models/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shoppingLists: ShoppingListModel[] | undefined;

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.shoppingListService.getShoppingLists().subscribe(res => {
      this.shoppingLists = res;
    });
  }

}
