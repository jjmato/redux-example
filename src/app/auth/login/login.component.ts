import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;

  private _destroyed = new Subject<void>();

  constructor(
    private _authSrv: AuthService,
    private _router: Router,
    private _appStore: Store<AppState>
  ) {}

  ngOnInit() {
    this._appStore
      .select('ui')
      .pipe(
        takeUntil(this._destroyed),
        map(ui => ui.isLoading)
      )
      .subscribe(loading => (this.loading = loading));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  onSubmit(data) {
    console.log(data);
    this._authSrv
      .login(data.email, data.password)
      .then(response => this._router.navigateByUrl('/'))
      .catch(err => Swal('Error en el login', err.message, 'error'));
  }
}
