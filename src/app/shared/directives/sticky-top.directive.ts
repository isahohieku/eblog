import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStickyTop]'
})
export class StickyTopDirective {

  constructor() { }

  @HostListener('window:scroll', ['$event']) scroll(e: Event) {
    const nav = document.getElementById('main-nav');

    if (scrollY && !nav.classList.contains('sticky')) {
      nav.classList.add('sticky');
    }

    if (!scrollY && nav.classList.contains('sticky')) {
      nav.classList.remove('sticky');
    }

  }

}
