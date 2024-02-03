import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ShoppingListAddComponent', () => {
  let component: ShoppingListAddComponent;
  let fixture: ComponentFixture<ShoppingListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ShoppingListAddComponent
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
        provideAnimations(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ShoppingListAddComponent', () => {
    expect(component).toBeTruthy();
  });
});
