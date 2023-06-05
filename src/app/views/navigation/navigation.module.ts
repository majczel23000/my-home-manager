import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from './navigation.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
  ]
})
export class NavigationModule { }
