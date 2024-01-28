import { Component, EventEmitter, Output, inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoanModel, LoanPositionModel } from 'src/app/shared/models/loans/loan.model';
import { LoansService } from 'src/app/shared/services/loans/loans.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoansPositionAddComponent } from '../loans-position-add/loans-position-add.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';
import { MatDialog } from '@angular/material/dialog';
import { LoansAddComponent } from "../loans-add/loans-add.component";
import { MatButtonModule } from '@angular/material/button';

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
        LoansAddComponent,
        MatButtonModule,
    ]
})
export class LoansListComponent implements OnInit, OnDestroy {

  protected loansService = inject(LoansService);
  protected matDialog = inject(MatDialog);

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

  public addPositionToLoan(loan: LoanModel): void {
    this.loansService.updateLoan(loan);
  }

  public removeLoan(loan: LoanModel): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loansService.removeLoan(loan);
      }
    });
  }

  public removeElement(loan: LoanModel, index: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const loanToUpdate: LoanModel = JSON.parse(JSON.stringify(loan));
        loanToUpdate.elements.splice(index, 1);
        this.loansService.updateLoan(loanToUpdate);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
