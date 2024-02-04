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
import { ROUTES } from 'src/app/routes';
import { Router } from '@angular/router';

describe('ShoppingListsComponent', () => {
  let component: ShoppingListsComponent;
  let fixture: ComponentFixture<ShoppingListsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        MatDialogModule,
        ShoppingListsComponent,
        RouterTestingModule.withRoutes(ROUTES),
      ],
      providers: [
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        },
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ShoppingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ShoppingListsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper amount of shopping lists', () => {
    const lists = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(lists.length).toBe(mockShoppingLists.length);
  });

  it('should render correct first shopping list title', () => {
    const firstShoppingList = fixture.debugElement.query(By.css('mat-card'));
    const listTitle = firstShoppingList.query(By.css('h2'));
    expect(listTitle.nativeElement.innerText).toBe(mockShoppingLists[0].name);
  });

  it('should display dialog on delete first shopping list icon click and not delete element on dismiss', () => {
    const openDialogSpy = spyOn(component.matDialog, 'open').and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<typeof component>);
    const lists = fixture.debugElement.queryAll(By.css('mat-card'));
    const deleteIcon = lists[0].query(By.css('.list-delete'));
    deleteIcon.triggerEventHandler('click', {
      preventDefault(): void {},
      stopPropagation(): void {},
    });
    expect(openDialogSpy).toBeDefined();
    expect(openDialogSpy).toHaveBeenCalled();
    fixture.detectChanges();
    const listsAfterDelete = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(listsAfterDelete.length).toBe(mockShoppingLists.length);
  });

  it('should display dialog on delete first shopping list icon click and delete element on confirm', () => {
    const openDialogSpy = spyOn(component.matDialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    const lists = fixture.debugElement.queryAll(By.css('mat-card'));
    const deleteIcon = lists[0].query(By.css('.list-delete'));
    deleteIcon.triggerEventHandler('click', {
      preventDefault(): void {},
      stopPropagation(): void {},
    });
    expect(openDialogSpy).toBeDefined();
    expect(openDialogSpy).toHaveBeenCalled();
    fixture.detectChanges();
    const listsAfterDelete = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(listsAfterDelete.length).toBe(mockShoppingLists.length);
  });

  it('should navigate to first shopping list details on click', () => {
    spyOn(router, 'navigateByUrl');
    const container = fixture.debugElement.query(By.css('.shopping-lists'));
    const div = container.query(By.css('div'));
    div.triggerEventHandler('click');
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/shopping/${mockShoppingLists[0].id}`);
  });
});