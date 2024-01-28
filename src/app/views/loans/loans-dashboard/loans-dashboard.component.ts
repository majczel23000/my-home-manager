import { Component } from '@angular/core';
import { LoansListComponent } from '../loans-list/loans-list.component';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loans-dashboard',
  standalone: true,
  imports: [
    CurrentLocationComponent,
    MatProgressSpinnerModule,
    LoansListComponent,
  ],
  templateUrl: './loans-dashboard.component.html',
  styleUrl: './loans-dashboard.component.scss'
})
export class LoansDashboardComponent {

  public isLoading = true;

}
