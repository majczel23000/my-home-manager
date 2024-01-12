import { Component, Input, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  protected router = inject(Router);

  @Input() sideNav: MatSidenav | undefined;

  public navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.sideNav?.toggle();
  }

}
