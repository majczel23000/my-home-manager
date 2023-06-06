import { TestBed } from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(ShoppingListService);
  });

  it('should be created ShoppingListService', () => {
    expect(service).toBeTruthy();
  });
});
