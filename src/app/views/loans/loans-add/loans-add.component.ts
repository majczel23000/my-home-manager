import { Component, inject } from '@angular/core';
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
    }).then(() => this.loanForm.controls.who.setValue(''));
  }

  public isAddButtonDisabled(): boolean {
    return !this.loanForm.value.who;
  }

}
