import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrudService } from 'src/app/core/services/crud.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Component } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';
import { mockUser, mockComment } from 'src/app/shared/util/mock-user';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;

  beforeEach(async(() => {
    localStorage.setItem('userObj', JSON.stringify(mockUser));
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['deleteResource']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['getUserObject']);

    crudServiceSpy.deleteResource.and.returnValue(of({ comment: mockComment }));
    TestBed.configureTestingModule({
      declarations: [CommentComponent, TestComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have date time', () => {
    const formattedDate = component.formatedDate;
    component.comment = mockComment;
    component.ngOnInit();
    expect(formattedDate).not.toEqual(component.formatedDate);
  });

  it('should delete comment', () => {
    component.comment = mockComment;
    component.deleteComment();

    expect(crudServiceSpy.deleteResource).toHaveBeenCalled();
  });
});

@Component({
  selector: `app-test-component`,
  template: `<app-comment [comment]="comment"></app-comment>`
})

class TestComponent {
  private comment: Comment = mockComment;

}
