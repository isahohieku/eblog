import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private isSettingsProfileImageUploadingStatus = new Subject<boolean>();
  private isSettingsProfileImageUploadingProgess = new Subject<any>();

  constructor() { }

  getSettingsProfileImageUploadingStatus(): Observable<boolean> {
    return this.isSettingsProfileImageUploadingStatus.asObservable();
  }

  getSettingsProfileImageUploadingProgress(): Observable<any> {
    return this.isSettingsProfileImageUploadingProgess.asObservable();
  }

  setSettingsProfileImageUploadingStatus(next): void {
    this.isSettingsProfileImageUploadingStatus.next(next);
  }

  setSettingsProfileImageUploadingProgress(value): void {
    this.isSettingsProfileImageUploadingProgess.next(value);
  }
}
