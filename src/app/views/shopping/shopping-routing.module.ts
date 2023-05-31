import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingDashboardComponent } from './shopping-dashboard/shopping-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
