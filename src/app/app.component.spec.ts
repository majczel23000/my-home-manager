import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AppComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have sidenav-container with fixedInViewport option', () => {
    const matSidenavContainer = fixture.debugElement.query(By.css('mat-sidenav-container'));
    expect(matSidenavContainer.attributes['fixedInViewport']).toBe('true');
  });

  it('should have sidenav with mode set to over', () => {
    const matSidenavContainer = fixture.debugElement.query(By.css('mat-sidenav'));
    expect(matSidenavContainer.attributes['mode']).toBe('over');
  });

});
