import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListsComponent } from './shopping-lists.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { Observable, of } from 'rxjs';
import { ShoppingListModel } from 'src/app/shared/models/shopping/shopping-list.model';
import { By } from '@angular/platform-browser';

const mockShoppingLists: ShoppingListModel[] = [
  {
    id: 'shopping_1',
    name: 'Home',
    description: 'List for home',
    products: [
      {
        isAdded: false,
        item: 'Milk',
        quantity: '1',
        category: 'Fridge',
        id: 1,
      },
      {
        isAdded: false,
        item: 'Bread',
        quantity: '2',
        category: 'Bakery',
        id: 2,
      }
    ]
  },
  {
    id: 'shopping_2',
    name: 'Garage',
    description: 'List for garage',
    products: [
      {
        isAdded: false,
        item: 'Desk',
        quantity: '1',
        category: 'Tools',
        id: 1,
      }
    ]
  }
];

@Injectable()
class MockShoppingListService extends ShoppingListService {
  override getShoppingLists(): Observable<ShoppingListModel[]> {
    return of(mockShoppingLists);
  }
  
  override deleteShoppingList(id: string): Promise<void> {
    mockShoppingLists.splice(parseInt(id), 1);
    return Promise.resolve();
  }
}

describe('ShoppingListsComponent', () => {
  let component: ShoppingListsComponent;
  let fixture: ComponentFixture<ShoppingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListsComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ShoppingListsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper amount of shopping lists', () => {
    const listElements = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listElements.length).toBe(mockShoppingLists.length);
  });

  it('should render correct shopping list title', () => {
    const listElement = fixture.debugElement.query(By.css('mat-list-item'));
    const listTitle = listElement.query(By.css('.list-title'));
    expect(listTitle.nativeElement.innerText).toBe(mockShoppingLists[0].name);
  });

  it('should render correct shopping list description', () => {
    const listElement = fixture.debugElement.query(By.css('mat-list-item'));
    const listTitle = listElement.query(By.css('.list-description'));
    expect(listTitle.nativeElement.innerText).toBe(mockShoppingLists[0].description);
  });

  it('should display dialog on delete shopping list icon click', () => {
    const openDialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
    const listElements = fixture.debugElement.queryAll(By.css('mat-list-item'));
    const listDelete = listElements[0].query(By.css('.list-delete'));
    listDelete.triggerEventHandler('click', {
      preventDefault(): void {},
      stopPropagation(): void {},
    });
    expect(openDialogSpy).toHaveBeenCalled();
  });
});
