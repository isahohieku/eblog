import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategoriesComponent } from './popular-categories.component';
import { LoaderComponent } from '../../misc/loader/loader.component';
import { PostCategoriesItemCardComponent } from '../../misc/post-categories-item-card/post-categories-item-card.component';
import { CrudService } from 'src/app/core/services/crud.service';
import { of } from 'rxjs';

describe('PopularCategoriesComponent', () => {
  let component: PopularCategoriesComponent;
  let fixture: ComponentFixture<PopularCategoriesComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;

  beforeEach(async(() => {
    crudServiceSpy = jasmine.createSpyObj('Crudservice', ['getResource']);
    crudServiceSpy.getResource.and.returnValue(of({}));
    TestBed.configureTestingModule({
      declarations: [ PopularCategoriesComponent, LoaderComponent, PostCategoriesItemCardComponent ],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
