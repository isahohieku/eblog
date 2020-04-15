import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { FormsModule, NgControl, FormControl } from '@angular/forms';
import { CrudService } from '../core/services/crud.service';
import { UtilService } from '../core/services/util.service';
import { FormControlComponent } from '../shared/components/forms/form-control/form-control.component';
import { TextareaComponent } from '../shared/components/forms/textarea/textarea.component';
import { LoaderComponent } from '../shared/components/misc/loader/loader.component';
import { TagItemComponent } from '../shared/components/misc/tag-item/tag-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let crudServiceSpy: {
    postRequest: jasmine.Spy;
  };
  let utilServiceSpy: {
    getUserObject: jasmine.Spy;
  };

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() { }
      },
    };
    crudServiceSpy = jasmine.createSpyObj('CrudService', [
      'postResource'
    ]);
    utilServiceSpy = jasmine.createSpyObj('UtilService', [
      'getUserObject'
    ]);
    TestBed.configureTestingModule({
      declarations: [ EditorComponent, FormControlComponent, TextareaComponent, LoaderComponent, TagItemComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
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
});
