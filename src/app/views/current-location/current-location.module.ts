import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentLocationComponent } from './current-location.component';

@NgModule({
  declarations: [
    CurrentLocationComponent,
  ],
  exports: [
    CurrentLocationComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CurrentLocationModule { }
