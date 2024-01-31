import { Component } from '@angular/core';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { ShoppingListAddComponent } from '../shopping-list-add/shopping-list-add.component';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  imports: [
    CurrentLocationComponent,
    ShoppingListAddComponent,
    ShoppingListsComponent,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  selector: 'app-shopping-dashboard',
  templateUrl: './shopping-dashboard.component.html',
  styleUrls: ['./shopping-dashboard.component.scss']
})
export class ShoppingDashboardComponent {

  public isLoading = true;

}
