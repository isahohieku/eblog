import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';
import { CrudService } from 'src/app/core/services/crud.service';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;


  beforeEach(async(() => {
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['postResource']);
    TestBed.configureTestingModule({
      declarations: [ ProfileCardComponent ],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
