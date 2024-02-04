import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListDetailsComponent } from './shopping-list-details.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { ActivatedRoute, Router } from '@angular/router';
import { mockShoppingLists } from 'src/app/test/mock/shopping-lists-data-mock';
import { ROUTES } from 'src/app/routes';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { MockShoppingListService } from 'src/app/test/mock/shopping-list-service-mock';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ShoppingListDetailsComponent', () => {
  let component: ShoppingListDetailsComponent;
  let fixture: ComponentFixture<ShoppingListDetailsComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule.withRoutes(ROUTES),
        ShoppingListDetailsComponent
      ],
      providers: [
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([
                ['id', mockShoppingLists[0].id]
              ])
            }
          }
        },
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        },
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ShoppingListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ShoppingListDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain current location component', () => {
    const currentLocation = fixture.debugElement.query(By.directive(CurrentLocationComponent));
    expect(currentLocation).toBeTruthy();
  });

  it('should get details of first shopping list with proper id parameter', () => {
    expect(component.shoppingList.id).toBe(mockShoppingLists[0].id);
  });

  it('should navigate to shopping lists view when empty id parameter', () => {
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('');
    fixture = TestBed.createComponent(ShoppingListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/shopping');
  });

  it('should render proper amount of mat-list-item tags', () => {
    const items = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(items.length).toBe(component.shoppingList.products!.length);
  });

  it('should have proper amount of categories sections', () => {
    const categories: string[] = [];
    component.shoppingList.products!.forEach(el => {
      if (!categories.includes(el.category)) {
        categories.push(el.category);
      }
    });
    const categoriesTitles = fixture.debugElement.queryAll(By.css('.details-category-title'));
    expect(categoriesTitles.length).toBe(categories.length);
  });

  it('should change background to red and change text style after product click', () => {
    
  });

  it('should delete product', () => {
    
  });

  it('should render form for adding product', () => {
    
  });

  it('should render button with disabled state by default for adding product ', () => {
    
  });

  it('should render button for adding product', () => {
    
  });

  it('should render select with proper categories', () => {
    
  });

  it('should add new product to shopping list', () => {
    
  });
});
