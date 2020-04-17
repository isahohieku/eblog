import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { FormsModule, NgControl, FormControl } from '@angular/forms';
import { UtilService } from '../core/services/util.service';
import { FormControlComponent } from '../shared/components/forms/form-control/form-control.component';
import { TextareaComponent } from '../shared/components/forms/textarea/textarea.component';
import { LoaderComponent } from '../shared/components/misc/loader/loader.component';
import { TagItemComponent } from '../shared/components/misc/tag-item/tag-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { mockArticleResponse, mockArticle, mockAuthor, mockUser } from '../shared/util/mock-user';
import { EditorService } from './editor.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let crudServiceSpy: jasmine.SpyObj<EditorService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate() { }
      },
    };
    crudServiceSpy = jasmine.createSpyObj('EditorService', ['addArticle', 'getArticle', 'updateArticle']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['getUserObject']);

    crudServiceSpy.addArticle.and.returnValue(of(mockArticleResponse));
    crudServiceSpy.getArticle.and.returnValue(of(mockArticleResponse));
    crudServiceSpy.updateArticle.and.returnValue(of(mockArticleResponse));

    TestBed.configureTestingModule({
      declarations: [EditorComponent, FormControlComponent, TextareaComponent, LoaderComponent, TagItemComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: EditorService, useValue: crudServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
      ]
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get article', () => {
    localStorage.setItem('userObj', JSON.stringify(mockUser));
    component.userObj = mockUser;
    component.getArticle();

    expect(crudServiceSpy.getArticle).toHaveBeenCalled();
  });

  it('should add article', () => {
    component.title = mockArticle.title;
    component.description = mockArticle.description;
    component.body = mockArticle.body;
    component.userObj = mockUser;
    component.addArticle();

    expect(crudServiceSpy.addArticle).toHaveBeenCalled();
  });

  it('should update article', () => {
    component.article = mockArticle;
    component.slug = 'hello world';
    component.title = mockArticle.title;
    component.description = mockArticle.description;
    component.body = mockArticle.body;
    component.userObj = mockUser;
    component.addArticle();

    expect(crudServiceSpy.updateArticle).toHaveBeenCalled();

  });

  it('should add tag', () => {
    const tags = Array(2).fill('hi');
    component.tagList = tags;
    const ev = new KeyboardEvent('keyup');
    component.tag = 'hello';
    component.addTag(ev);

    expect(tags.length).toBeGreaterThan(2);
  });

  it('should remove a tag', () => {
    const tags = Array(3).fill('hi');
    component.tagList = tags;
    component.remove(1);

    expect(tags.length).toBeLessThan(3);
  });
});
