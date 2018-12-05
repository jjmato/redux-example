import { SetUserAction } from './../../auth/auth.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  constructor(
    private _authSrv: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) {}

  ngOnInit() {}

  logout() {
    this._authSrv
      .logout()
      .then(res => {
        this._store.dispatch(new SetUserAction());
        this._router.navigateByUrl('login');
      })
      .catch(err => Swal('Error en el logout', err.message, 'error'));
  }
}
