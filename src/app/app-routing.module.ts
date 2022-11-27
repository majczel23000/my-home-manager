import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ShoppingListDetailsComponent
} from './views/shopping-list/shopping-list-details/shopping-list-details.component';
import { ShoppingListComponent } from './views/shopping-list/shopping-list.component';
import { ShoppingListAddComponent } from './views/shopping-list/shopping-list-add/shopping-list-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lists',
    pathMatch: 'full',
  },
  {
    path: 'lists',
    component: ShoppingListComponent,
  },
  {
    path: 'lists/add',
    component: ShoppingListAddComponent,
  },
  {
    path: 'lists/:id',
    component: ShoppingListDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
