import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import { FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { UtilService } from 'src/app/core/services/util.service';
import { TextareaComponent } from '../textarea/textarea.component';
import { LoaderComponent } from '../../misc/loader/loader.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let crudServiceSpy: {
    postRequest: jasmine.Spy;
  };
  let utilServiceSpy: {
    getUserObject: jasmine.Spy;
  };

  beforeEach(async(() => {
    crudServiceSpy = jasmine.createSpyObj('CrudService', [
      'postResource'
    ]);
    utilServiceSpy = jasmine.createSpyObj('UtilService', [
      'getUserObject'
    ]);
    TestBed.configureTestingModule({
      declarations: [ CommentFormComponent, TextareaComponent, LoaderComponent ],
      imports: [FormsModule],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
