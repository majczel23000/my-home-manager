import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { environment } from 'src/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { ROUTES } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
    provideAnimations(),
    provideRouter(ROUTES),
  ],
};
