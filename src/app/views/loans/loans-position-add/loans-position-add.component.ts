import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LoanModel, LoanPositionModel } from 'src/app/shared/models/loans/loan.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-loans-position-add',
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
  templateUrl: './loans-position-add.component.html',
  styleUrl: './loans-position-add.component.scss'
})
export class LoansPositionAddComponent {

  protected formBuilder = inject(FormBuilder);

  @Input() loan!: LoanModel;
  @Output() positionAdded = new EventEmitter<LoanModel>();

  public positionForm = this.formBuilder.group({
    description: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    isLoan: new FormControl(true, Validators.required),
  });

  add(): void {
    if (this.positionForm.invalid || isNaN(parseFloat(this.positionForm.value.value!))) {
      return;
    }

    const loanToUpdate = JSON.parse(JSON.stringify(this.loan));
    
    loanToUpdate.elements.push({
      isLoan: this.positionForm.value.isLoan!,
      value: Math.abs(parseFloat(this.positionForm.value.value!)),
      description: this.positionForm.value.description!,
    });

    this.positionForm.reset();

    this.positionAdded.emit(loanToUpdate);
  }

}
