import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { CurrentLocationModule } from '../current-location/current-location.module';
import { ShoppingDashboardComponent } from './shopping-dashboard/shopping-dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShoppingListsComponent } from './shopping-lists/shopping-lists.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShoppingListAddComponent } from './shopping-list-add/shopping-list-add.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ShoppingDashboardComponent,
    ShoppingListsComponent,
    ShoppingListDetailsComponent,
    ShoppingListAddComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    CurrentLocationModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
  ]
})
export class ShoppingModule { }
