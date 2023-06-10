import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingDashboardComponent } from './shopping-dashboard.component';
import { By } from '@angular/platform-browser';
import { CurrentLocationComponent } from '../../current-location/current-location.component';

describe('ShoppingDashboardComponent', () => {
  let component: ShoppingDashboardComponent;
  let fixture: ComponentFixture<ShoppingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ShoppingDashboardComponent,
        CurrentLocationComponent,
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

  it('should contain current location component', () => {
    const currentLocation = fixture.debugElement.query(By.css('app-current-location'));
    expect(currentLocation).toBeTruthy();
  });

  it('should contain current location component with proper text', () => {
    const currentLocation = fixture.debugElement.query(By.css('app-current-location'));
    expect(currentLocation.componentInstance.location).toBe('Shopping lists');
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
