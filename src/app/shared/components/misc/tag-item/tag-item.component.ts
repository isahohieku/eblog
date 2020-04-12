import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {
  @Input() title = '';
  @Output() remove = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  removeItem() {
    this.remove.emit();
  }

}
