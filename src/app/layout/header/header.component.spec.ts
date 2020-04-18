import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { StickyTopDirective } from 'src/app/shared/directives/sticky-top.directive';
import { ReplaySubject } from 'rxjs';
import { RouterEvent, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-outlet',
    template: '<router-outlet></router-outlet>'
})

class RouterOutletComponent {}

@Component({
  selector: 'app-dummy',
  template: '<p>Hello</p>'
})

class DummyComponent {
  findIfContainsProfile() {}
  logout() {}
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let findIfContainsProfile: jasmine.Spy;

  const eventSubject = new ReplaySubject<RouterEvent>(1);

  const routerMock = {
    naviagate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: '/'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, StickyTopDirective, RouterOutletComponent, DummyComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        // { provide: Router, useValue: routerMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    findIfContainsProfile = spyOn(component, 'findIfContainsProfile');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be home and not icluded', () => {
    expect(findIfContainsProfile).not.toHaveBeenCalled();
  });

  it('should test /', () => {
    eventSubject.next(new NavigationEnd(0, '', ''));
    expect(findIfContainsProfile).not.toHaveBeenCalled();
  });

  it('should test /profile', () => {
    eventSubject.next(new NavigationEnd(0, '/profile', '/profile'));
    expect(findIfContainsProfile).not.toHaveBeenCalled();
  });

  it('should test /others', () => {
    eventSubject.next(new NavigationEnd(0, '/editor', '/editor'));
    expect(findIfContainsProfile).not.toHaveBeenCalled();
  });

  it('should test /articles', () => {
    eventSubject.next(new NavigationEnd(0, '/articles', '/articles'));
    expect(findIfContainsProfile).not.toHaveBeenCalled();
  });
});
