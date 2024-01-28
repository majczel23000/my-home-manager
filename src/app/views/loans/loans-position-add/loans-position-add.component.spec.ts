import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPositionAddComponent } from './loans-position-add.component';

describe('LoansPositionAddComponent', () => {
  let component: LoansPositionAddComponent;
  let fixture: ComponentFixture<LoansPositionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansPositionAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansPositionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
