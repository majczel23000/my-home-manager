import { Component, Input } from '@angular/core';
import { ShoppingListModel } from '../../../shared/models/shopping-list.model';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent
} from '../../../shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent {

  @Input() shoppingList: ShoppingListModel = {};

  constructor(
    private router: Router,
    private shoppingListService: ShoppingListService,
    public dialog: MatDialog,
  ) { }

  public goToDetails(): void {
    if (!this.shoppingList.id) return;
    this.router.navigateByUrl(`/lists/${this.shoppingList.id}`);
  }

  public delete(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shoppingListService.deleteShoppingList(this.shoppingList.id!);
      }
    });
  }

}
