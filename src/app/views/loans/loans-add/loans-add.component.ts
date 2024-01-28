import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LoanModel, LoanPositionModel } from 'src/app/shared/models/loans/loan.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { LoansService } from 'src/app/shared/services/loans/loans.service';

@Component({
  selector: 'app-loans-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './loans-add.component.html',
  styleUrl: './loans-add.component.scss'
})
export class LoansAddComponent {

  protected formBuilder = inject(FormBuilder);
  protected loansService = inject(LoansService);

  public loanForm = this.formBuilder.group({
    who: new FormControl('', Validators.required),
  });

  add(): void {
    if (this.loanForm.invalid) {
      return;
    }

    this.loansService.createLoan({
      who: this.loanForm.value.who!,
      elements: [],
    });
  }

}
