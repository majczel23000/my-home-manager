import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'shopping-list';
  public isLoading = true;

  constructor(
    public spinnerService: SpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.spinnerService.isLoading().subscribe(value => {
      this.isLoading = value;
    });
  }
}
