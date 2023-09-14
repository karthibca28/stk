import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoadingBar: any;
  isLoadingState() {
    throw new Error('Method not implemented.');
  }

  showLoader: boolean = false;
  public status: Subject<boolean> = new Subject();
  private _active = false;
  constructor() { }

  public get active(): boolean {
    return this._active;
  }

  public set active(v: boolean) {
    this._active = v;
    this.status.next(v);
  }
  show() {
    this.active = true;
    this.status.next(true);
  }
  hide() {
    this.active = false;
    this.status.next(false);
  }
}
