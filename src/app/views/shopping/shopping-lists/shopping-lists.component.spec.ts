import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListsComponent } from './shopping-lists.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { By } from '@angular/platform-browser';
import { MockShoppingListService } from 'src/app/test/mock/shopping-list-service-mock';
import { mockShoppingLists } from 'src/app/test/mock/shopping-lists-data-mock';
import { of } from 'rxjs';

describe('ShoppingListsComponent', () => {
  let component: ShoppingListsComponent;
  let fixture: ComponentFixture<ShoppingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule,
        MatDialogModule,
        ShoppingListsComponent,
      ],
      providers: [
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        },
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
    const listElements = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(listElements.length).toBe(mockShoppingLists.length);
  });

  it('should render correct shopping list title', () => {
    const listElement = fixture.debugElement.query(By.css('mat-card'));
    const listTitle = listElement.query(By.css('h2'));
    expect(listTitle.nativeElement.innerText).toBe(mockShoppingLists[0].name);
  });

  it('should display dialog on delete shopping list icon click', () => {
    const openDialogSpy = spyOn(component.matDialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);;
    const listElements = fixture.debugElement.queryAll(By.css('mat-card'));
    const listDelete = listElements[0].query(By.css('.list-delete'));
    listDelete.triggerEventHandler('click', {
      preventDefault(): void {},
      stopPropagation(): void {},
    });
    expect(openDialogSpy).toHaveBeenCalled();
  });
});