import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansDashboardComponent } from './loans-dashboard.component';

describe('LoansDashboardComponent', () => {
  let component: LoansDashboardComponent;
  let fixture: ComponentFixture<LoansDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
