import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../../shared/services/shopping-list.service';
import { ShoppingListModel } from '../../shared/models/shopping-list.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingLists: ShoppingListModel[] = [] as ShoppingListModel[];
  private subscriptions: Subscription[] = [] as Subscription[];
  public isLoading = true;

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingLists().subscribe(res => {
        this.shoppingLists = res;
        this.isLoading = false;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
