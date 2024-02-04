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

describe('ShoppingDashboardComponent', () => {
  let component: ShoppingDashboardComponent;
  let fixture: ComponentFixture<ShoppingDashboardComponent>;
  const CURRENT_LOCATION_TEXT = 'Listy zakupów';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        ShoppingDashboardComponent,
        CurrentLocationComponent,
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
        provideAnimations(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ShoppingDashboardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain shopping lists component', () => {
    const shoppingLists = fixture.debugElement.query(By.directive(ShoppingListsComponent));
    expect(shoppingLists).toBeTruthy();
  });

  it('should contain add shopping list component', () => {
    const shoppingListAdd = fixture.debugElement.query(By.directive(ShoppingListAddComponent));
    expect(shoppingListAdd).toBeTruthy();
  });

  it('should contain current location component with proper text', () => {
    const currentLocation = fixture.debugElement.query(By.directive(CurrentLocationComponent));
    expect(currentLocation).toBeTruthy();
    expect(currentLocation.componentInstance.location).toBe(CURRENT_LOCATION_TEXT);
  });

  it('should be in loading state by default', () => {
    expect(component.isLoading).toBeTruthy();
  });

  it('wrapper should be hidden by default', () => {
    const wrapper = fixture.debugElement.query(By.css('.shopping-dashboard'));
    expect(wrapper.nativeElement.style.visibility).toBe('hidden');
  });

  it('wrapper should be visible when loading finished', () => {
    component.isLoading = false;
    const wrapper = fixture.debugElement.query(By.css('.shopping-dashboard'));
    wrapper.nativeElement.style.visibility = 'visible';
    expect(wrapper.nativeElement.style.visibility).toBe('visible');
  });
});
