import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public loading = false;
  isLoadingBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  isLoading(): Observable<boolean> {
    return this.isLoadingBS.asObservable();
  }

  setValue(value: boolean): void {
    this.isLoadingBS.next(value);
  }

  public setLoading(value: boolean): void {
    this.loading = value;
  }
}
