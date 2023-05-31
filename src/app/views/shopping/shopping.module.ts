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

@NgModule({
  declarations: [
    ShoppingDashboardComponent,
    ShoppingListsComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    CurrentLocationModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class ShoppingModule { }
