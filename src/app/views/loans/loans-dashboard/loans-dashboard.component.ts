import { Component } from '@angular/core';
import { LoansListComponent } from '../loans-list/loans-list.component';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoansAddComponent } from "../loans-add/loans-add.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-loans-dashboard',
    standalone: true,
    templateUrl: './loans-dashboard.component.html',
    styleUrl: './loans-dashboard.component.scss',
    imports: [
        CurrentLocationComponent,
        MatProgressSpinnerModule,
        LoansListComponent,
        LoansAddComponent,
        MatDividerModule,
    ]
})
export class LoansDashboardComponent {

  public isLoading = true;

}
