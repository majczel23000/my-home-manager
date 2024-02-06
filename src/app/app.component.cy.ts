import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';
import { HeaderComponent } from './views/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './views/navigation/navigation.component';

describe('AppComponent', () => {

    beforeEach(() => {
        cy.mount(AppComponent, {
            imports: [
                HeaderComponent,
                ConfirmDialogComponent,
                MatSidenavModule,
                RouterModule,
                NavigationComponent,
            ],
            providers: [
                provideAnimations(),
            ]
        });
    })


    it('Should have title', () => {
        cy.get('h1').should('have.text', 'My Home Manager');
    });
})