import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatButtonModule,
  ],
  selector: 'app-confirm-dialog.component.ts',
  templateUrl: './confirm-dialog.component.ts.component.html',
  styleUrls: ['./confirm-dialog.component.ts.component.scss']
})
export class ConfirmDialogComponent {

  public data = inject(MAT_DIALOG_DATA);

}
