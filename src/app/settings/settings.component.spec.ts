import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { FormControlComponent } from '../shared/components/forms/form-control/form-control.component';
import { TextareaComponent } from '../shared/components/forms/textarea/textarea.component';
import { AuthorComponent } from '../shared/components/widgets/author/author.component';
import { FormsModule, ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';
import { LoaderComponent } from '../shared/components/misc/loader/loader.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockUser, mockUserResponse } from '../shared/util/mock-user';
import { CrudService } from '../core/services/crud.service';
import { UtilService } from '../core/services/util.service';
import { of } from 'rxjs';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;

  beforeEach(async(() => {

    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() { }
      },
    };
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['updateResource']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['setUserObject']);
    TestBed.configureTestingModule({
      declarations: [SettingsComponent, FormControlComponent, TextareaComponent, AuthorComponent, LoaderComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
      ]
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .overrideComponent(TextareaComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('userObj', JSON.stringify(mockUser));

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update', () => {
    crudServiceSpy.updateResource.and.returnValue(of(mockUserResponse));

    component.updateData();
    expect(crudServiceSpy.updateResource).toHaveBeenCalled();
  });
});
