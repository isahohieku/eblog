import { StickyTopDirective } from './sticky-top.directive';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoaderComponent } from '../components/misc/loader/loader.component';
import { PostCardComponent } from '../components/cards/post-card/post-card.component';
import { AuthorComponent } from '../components/widgets/author/author.component';
import { SearchWidgetComponent } from '../components/widgets/search-widget/search-widget.component';
import { PopularPostsComponent } from '../components/widgets/popular-posts/popular-posts.component';
import { PopularPostsCardComponent } from '../components/cards/popular-posts-card/popular-posts-card.component';
import { PostCategoriesItemCardComponent } from '../components/misc/post-categories-item-card/post-categories-item-card.component';
import { PopularCategoriesComponent } from '../components/widgets/popular-categories/popular-categories.component';
import { PostMetaCardComponent } from '../components/cards/post-meta-card/post-meta-card.component';
import { FormControlComponent } from '../components/forms/form-control/form-control.component';
import { HttpClientTestingModule } from '@angular/common/http/testing/';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgControl, FormControl } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('StickyTopDirective', () => {

  let fixture: ComponentFixture<LayoutComponent>;
  let component: LayoutComponent;
  let header: HTMLElement;
  let scrollDirectiveComponent: DebugElement[];

  beforeEach(() => {
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
        LayoutComponent,
        StickyTopDirective,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        LoaderComponent,
        PostCardComponent,
        AuthorComponent,
        SearchWidgetComponent,
        PopularPostsComponent,
        PopularPostsCardComponent,
        PostCategoriesItemCardComponent,
        PopularCategoriesComponent,
        PostMetaCardComponent,
        FormControlComponent
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, NgxPaginationModule, ToastrModule.forRoot()],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    scrollDirectiveComponent = fixture.debugElement.queryAll(By.directive(StickyTopDirective));
  });

  it('should create an instance', () => {
    const directive = new StickyTopDirective();
    expect(directive).toBeTruthy();
  });

  it('should detect scroll', fakeAsync(() => {
    header = scrollDirectiveComponent[0].nativeElement as HTMLElement;
    const nav = document.getElementById('main-nav');

    const body = document.getElementsByTagName('body')[0];

    const e = new Event('scroll');
    scrollY = 500;

    window.dispatchEvent(e);

    tick(100);
    fixture.detectChanges();

    expect(nav.classList.contains('sticky')).toBeTruthy();

    scrollY = 0;

    window.dispatchEvent(e);

    tick(100);
    fixture.detectChanges();


    expect(nav.classList.contains('sticky')).toBeFalsy();

  }));
});
