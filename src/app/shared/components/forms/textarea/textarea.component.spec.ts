import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { FormsModule, NgControl, FormControl } from '@angular/forms';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

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
      declarations: [ TextareaComponent ],
      imports: [FormsModule],
      providers: [NG_CONTROL_PROVIDER]
    })
    .overrideComponent(TextareaComponent, {
      add: { providers: [NG_CONTROL_PROVIDER] },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
