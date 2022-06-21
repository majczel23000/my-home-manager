import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListSingleElementComponent } from './shopping-list-single-element.component';

describe('ShoppingListSingleElementComponent', () => {
  let component: ShoppingListSingleElementComponent;
  let fixture: ComponentFixture<ShoppingListSingleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListSingleElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListSingleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
