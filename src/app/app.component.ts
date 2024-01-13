import { Component } from '@angular/core';
import { HeaderComponent } from './views/header/header.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './views/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    ConfirmDialogComponent,
    MatSidenavModule,
    RouterModule,
    NavigationComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
