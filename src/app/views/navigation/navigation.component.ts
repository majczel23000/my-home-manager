import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
  ],
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent {

  protected router = inject(Router);

  @Input() sideNav: MatSidenav | undefined;

  public navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.sideNav?.toggle();
  }

}
