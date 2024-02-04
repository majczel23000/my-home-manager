import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { MockShoppingListService } from 'src/app/test/mock/shopping-list-service-mock';
import { mockShoppingLists } from 'src/app/test/mock/shopping-lists-data-mock';

describe('ShoppingListAddComponent', () => {
  let component: ShoppingListAddComponent;
  let fixture: ComponentFixture<ShoppingListAddComponent>;
  const BUTTON_TEXT = 'Dodaj';
  const INPUT_TEXT_TO_FILL = 'Lista testowa';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ShoppingListAddComponent
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
        provideAnimations(),
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        },
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

  it('should contain h3 input label with text', () => {
    const label = fixture.debugElement.query(By.css('h3'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.innerText.length).toBeGreaterThan(0);
  });

  it('should contain form with single input element without initial value', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
    const input = form.query(By.css('input'));
    expect(input).toBeTruthy();
    expect(input.nativeElement.value).toBe('');
  });

  it('should contain button to add list with disabled state by default', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
    const button = form.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.innerText).toContain(BUTTON_TEXT);
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should fill input with proper text', () => {
    const input = fixture.debugElement.query(By.css('form')).query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = INPUT_TEXT_TO_FILL;
    expect(input.value).toBe(INPUT_TEXT_TO_FILL);
  });

  it('should fill input with text and have button able to submit action (test 2WayDataBinding)', fakeAsync(() => {
    const form = fixture.debugElement.query(By.css('form'));
    const input = form.query(By.css('input')).nativeElement as HTMLInputElement;
    const button = form.query(By.css('button')).nativeElement as HTMLButtonElement;
    component.shoppingListToAdd.name = INPUT_TEXT_TO_FILL;
    fixture.detectChanges();
    tick();
    expect(input.value).toBe(INPUT_TEXT_TO_FILL);
    expect(button.disabled).toBeFalse();
  }));

  it('should add new item to shopping lists', fakeAsync(() => {
    const form = fixture.debugElement.query(By.css('form'));
    const button = form.query(By.css('button'));
    component.shoppingListToAdd.name = INPUT_TEXT_TO_FILL;
    fixture.detectChanges();
    tick();
    button.triggerEventHandler('click');
    expect(mockShoppingLists[mockShoppingLists.length - 1].name).toBe(INPUT_TEXT_TO_FILL);
    tick();
    expect(component.shoppingListToAdd.name).toBe('');
  }));
});