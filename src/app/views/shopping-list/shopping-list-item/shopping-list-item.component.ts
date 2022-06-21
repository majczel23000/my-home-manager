import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListModel } from '../../../shared/models/shopping-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent implements OnInit {

  @Input() shoppingList: ShoppingListModel = {};

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToDetails(): void {
    if (!this.shoppingList.id) return;
    this.router.navigateByUrl(`/lists/${this.shoppingList.id}`);
  }

  delete(): void {

  }

}
