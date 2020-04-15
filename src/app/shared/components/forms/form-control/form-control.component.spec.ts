import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlComponent } from './form-control.component';
import { FormsModule, NgControl, ReactiveFormsModule, FormControlDirective, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

describe('FormControlComponent', () => {
  let component: FormControlComponent;
  let fixture: ComponentFixture<FormControlComponent>;

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() {}
      },
    };
    TestBed.configureTestingModule({
      declarations: [ FormControlComponent ],
      imports: [FormsModule],
      providers: [NG_CONTROL_PROVIDER]
    })
    .overrideComponent(FormControlComponent, {
      add: { providers: [NG_CONTROL_PROVIDER] },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlComponent);
    component = fixture.componentInstance;
    fixture.componentRef.injector.get(NgControl);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isRequired = true;
    component.pattern = 'sfs';
    expect(component).toBeTruthy();
  });
});
