import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
        MatMenuModule,
        MatIconModule,
    ]
})
export class HeaderModule { }
