import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsedMdComponent } from './parsed-md.component';

describe('ParsedMdComponent', () => {
  let component: ParsedMdComponent;
  let fixture: ComponentFixture<ParsedMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParsedMdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsedMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
