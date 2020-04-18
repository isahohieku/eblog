import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { NgControl, FormControl } from '@angular/forms';
import { FormControlComponent } from './shared/components/forms/form-control/form-control.component';
import { TextareaComponent } from './shared/components/forms/textarea/textarea.component';

describe('AppComponent', () => {
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
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        MainModule,
        SharedModule.forRoot(),
        LayoutModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
