import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import { FormsModule, NgControl, FormControl } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { UtilService } from 'src/app/core/services/util.service';
import { TextareaComponent } from '../textarea/textarea.component';
import { LoaderComponent } from '../../misc/loader/loader.component';
import { of } from 'rxjs';
import { mockCommentResponse, mockUser } from 'src/app/shared/util/mock-user';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() {}
      },
    };
    crudServiceSpy = jasmine.createSpyObj('CrudService', [
      'postResource'
    ]);
    utilServiceSpy = jasmine.createSpyObj('UtilService', [
      'getUserObject'
    ]);
    crudServiceSpy.postResource.and.returnValue(of(mockCommentResponse));
    TestBed.configureTestingModule({
      declarations: [ CommentFormComponent, TextareaComponent, LoaderComponent ],
      imports: [FormsModule],
      providers: [
        NG_CONTROL_PROVIDER,
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
      ]
    })
    .overrideComponent(TextareaComponent, {
      add: { providers: [NG_CONTROL_PROVIDER] },
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

  it('should add comment', () => {
    component.userObj = mockUser;
    component.body = 'Hi';
    component.addComment();

    expect(crudServiceSpy.postResource).toHaveBeenCalled();
  });

  it('should not add comment if empty', () => {
    component.userObj = mockUser;
    component.body = '';
    component.addComment();

    expect(crudServiceSpy.postResource).not.toHaveBeenCalled();
  });
});
