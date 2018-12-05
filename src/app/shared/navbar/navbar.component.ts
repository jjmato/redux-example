import { User } from './../../auth/user.model';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { takeUntil, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject<void>();

  name: string;

  constructor(private _appStore: Store<AppState>) {}

  ngOnInit() {
    this._appStore
      .select('auth')
      .pipe(
        takeUntil(this._destroyed),
        map(state => state.user),
        filter(Boolean)
      )
      .subscribe(user => (this.name = user.name));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
