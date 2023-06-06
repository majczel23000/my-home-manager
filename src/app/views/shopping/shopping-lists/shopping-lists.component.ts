import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';
import { ShoppingListModel } from 'src/app/shared/models/shopping/shopping-list.model';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingListsComponent implements OnInit, OnDestroy {

  @Output() isLoading = new EventEmitter<boolean>();
  public shoppingLists: ShoppingListModel[] = [] as ShoppingListModel[];
  protected subscriptions: Subscription[] = [] as Subscription[];

  constructor(
    protected shoppingListService: ShoppingListService,
    protected router: Router,
    protected matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getShoppingLists();
  }

  protected getShoppingLists(): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingLists().subscribe(res => {
        this.shoppingLists = res;
        this.isLoading.emit(false);
      })
    )
  }

  public goToShoppingListDetails(shoppingList: ShoppingListModel): void {
    console.log(shoppingList);
    if (shoppingList.id) {
      this.router.navigateByUrl(`/shopping/${shoppingList.id}`);
    }
  }

  public deleteShoppingList(shoppingList: ShoppingListModel, event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this.matDialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shoppingListService.deleteShoppingList(shoppingList.id!);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
