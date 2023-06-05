import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() sideNav: MatSidenav | undefined;

  constructor(
    protected router: Router,
  ) { }

  public navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.sideNav?.toggle();
  }

}
