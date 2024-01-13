import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogActions,
  ],
  selector: 'app-confirm-dialog.component.ts',
  templateUrl: './confirm-dialog.component.ts.component.html',
  styleUrls: ['./confirm-dialog.component.ts.component.scss']
})
export class ConfirmDialogComponent {

}
