import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansAddComponent } from './loans-add.component';

describe('LoansAddComponent', () => {
  let component: LoansAddComponent;
  let fixture: ComponentFixture<LoansAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
