import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingDashboardComponent } from './shopping-dashboard.component';
import { By } from '@angular/platform-browser';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { ShoppingListAddComponent } from '../shopping-list-add/shopping-list-add.component';
import { provideRouter } from '@angular/router';
import { ROUTES } from 'src/app/routes';

describe('ShoppingDashboardComponent', () => {

  beforeEach(() => {
      cy.mount(ShoppingDashboardComponent, {
        providers: [
          importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
          provideAnimations(),
          provideRouter(ROUTES),
        ]
      });
  })


  it('Should have title', () => {
      cy.get('h2').first().should('contain.text', 'Listy zakupów');
  });
});