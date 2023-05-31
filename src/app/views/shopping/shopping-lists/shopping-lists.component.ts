import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListModel } from 'src/app/shared/models/shopping-list.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss']
})
export class ShoppingListsComponent implements OnInit {

  @Output() isLoading = new EventEmitter<boolean>();
  shoppingLists: ShoppingListModel[] = [] as ShoppingListModel[];
  private subscriptions: Subscription[] = [] as Subscription[];

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingLists().subscribe(res => {
        this.shoppingLists = res;
        this.isLoading.emit(false);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
