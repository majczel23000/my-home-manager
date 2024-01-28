import { Injectable, inject } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { LoanModel } from '../../models/loans/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  protected firestore = inject(AngularFirestore);

  // Get all loans
  getLoansList(): Observable<LoanModel[]> {
    return this.firestore.collection('loans').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...(c.payload.doc.data() as LoanModel) }))
      )
    );
  }

  // Update loan by id
  updateLoan(loan: LoanModel): Promise<void> {
    return this.firestore.collection('loans').doc(loan.id).set(loan, { merge: true });
  }

  // Remove loan
  removeLoan(loan: LoanModel): Promise<void> {
    return this.firestore.collection('loans').doc(loan.id).delete();
  }

  // Create new loan
  createLoan(loan: LoanModel): Promise<void | DocumentReference<unknown>> {
    return this.firestore.collection('loans').add(loan).then(ref => {
      ref.set({ id: ref.id }, { merge: true });
    });
  }

}
