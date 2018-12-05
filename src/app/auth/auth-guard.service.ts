import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router, private _authSrv: AuthService) {}

  canActivate(): Observable<boolean> {
    return this._authSrv
      .isAuth$
      .pipe(
        tap(isAuth => (isAuth ? null : this._router.navigateByUrl('/login')))
      );
  }
}
