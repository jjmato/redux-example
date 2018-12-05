import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  constructor(private _router: Router, private _authSrv: AuthService) {}

  // canActivate(): Observable<boolean> {
  //   return this._authSrv.isAuth$.pipe(
  //     tap(isAuth => (isAuth ? null : this._router.navigateByUrl('/login')))
  //   );
  // }

  canLoad() {
    return this._authSrv.isAuth$.pipe(
      take(1),
      tap(isAuth => (isAuth ? null : this._router.navigateByUrl('/login')))
    );
  }
}
