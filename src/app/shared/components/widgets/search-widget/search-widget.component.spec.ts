import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWidgetComponent } from './search-widget.component';
import { FormControlComponent } from '../../forms/form-control/form-control.component';
import { FormsModule, NgControl, FormControl } from '@angular/forms';

describe('SearchWidgetComponent', () => {
  let component: SearchWidgetComponent;
  let fixture: ComponentFixture<SearchWidgetComponent>;

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() { }
      },
    };
    TestBed.configureTestingModule({
      declarations: [SearchWidgetComponent, FormControlComponent],
      imports: [FormsModule]
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
