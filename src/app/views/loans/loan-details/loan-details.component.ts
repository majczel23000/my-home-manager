import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoansService } from 'src/app/shared/services/loans/loans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoanModel } from 'src/app/shared/models/loans/loan.model';
import { LoansPositionAddComponent } from "../loans-position-add/loans-position-add.component";

@Component({
    selector: 'app-loan-details',
    standalone: true,
    templateUrl: './loan-details.component.html',
    styleUrl: './loan-details.component.scss',
    imports: [
        CurrentLocationComponent,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        LoansPositionAddComponent
    ]
})
export class LoanDetailsComponent implements OnInit, OnDestroy {

  protected loansService = inject(LoansService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected subscriptions: Subscription[] = [];
  public isLoading = true;
  public loan: LoanModel = {} as LoanModel;

  ngOnInit(): void {
    this.getIdFromParameter();
  }

  protected getIdFromParameter(): void {
    const loanId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!loanId) {
      this.router.navigateByUrl('/loans');
      return;
    }
    this.getLoanDetails(loanId);
  }

  protected getLoanDetails(id: string): void {
    this.subscriptions.push(
      this.loansService.getLoanById(id).subscribe(
        loan => {
          this.loan = loan;
          this.isLoading = false;
        }
      )
    );
  }

  public addPositionToLoan(loan: LoanModel): void {
    this.loansService.updateLoan(loan);
  }

  public removeElement(loan: LoanModel, index: number): void {
    const loanToUpdate: LoanModel = JSON.parse(JSON.stringify(loan));
    loanToUpdate.elements.splice(index, 1);
    this.loansService.updateLoan(loanToUpdate);
  }

  public getSum(): number {
    let result = 0;
    this.loan.elements.forEach(element => {
      if (element.isLoan) {
        result += element.value;
      } else {
        result -= element.value;
      }
    });
    return result;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
