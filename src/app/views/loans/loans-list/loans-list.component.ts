import { Component, EventEmitter, Output, inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoanModel } from 'src/app/shared/models/loans/loan.model';
import { LoansService } from 'src/app/shared/services/loans/loans.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoansPositionAddComponent } from '../loans-position-add/loans-position-add.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loans-list',
    standalone: true,
    templateUrl: './loans-list.component.html',
    styleUrl: './loans-list.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatListModule,
        MatIconModule,
        MatExpansionModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        LoansPositionAddComponent,
        ConfirmDialogComponent,
        MatButtonModule,
        MatCardModule,
    ]
})
export class LoansListComponent implements OnInit, OnDestroy {

  protected loansService = inject(LoansService);
  protected matDialog = inject(MatDialog);
  protected router = inject(Router);

  @Output() isLoading = new EventEmitter<boolean>();
  protected subscriptions: Subscription[] = [] as Subscription[];
  public loans: LoanModel[] = [] as LoanModel[];

  ngOnInit(): void {
    this.getLoansList();
  }
  
  protected getLoansList(): void {
    this.subscriptions.push(
      this.loansService.getLoansList().subscribe(loans => {
        this.loans = loans;
        this.isLoading.emit(false);
      })
    )
  }

  public goToLoanDetails(loan: LoanModel): void {
    if (loan.id) {
      this.router.navigateByUrl(`/loans/${loan.id}`);
    }
  }

  public deleteLoan(loan: LoanModel, event: any): void {
    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Na pewno usunąć pozycję?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loansService.removeLoan(loan);
      }
    });
  }

  public getSum(loan: LoanModel): number {
    let result = 0;
    loan.elements.forEach(element => {
      if (element.isLoan) {
        result += element.value;
      } else {
        result -= element.value;
      }
    });
    return result;
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
