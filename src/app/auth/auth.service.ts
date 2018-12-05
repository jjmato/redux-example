import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _afAuth: AngularFireAuth) {}

  initAuthListener() {
    this._afAuth.authState.subscribe((fbUser: firebase.User) =>
      console.log(fbUser)
    );
  }

  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    const promise = this._afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    promise
      .then(response => console.log(response))
      .catch(err => console.error(err));

    return promise;
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    const promise = this._afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    promise
      .then(response => console.log(response))
      .catch(err => console.error(err));
    return promise;
  }

  logout(): Promise<void> {
    return this._afAuth.auth.signOut();
  }

  get isAuth$(): Observable<boolean> {
    return this._afAuth.authState.pipe(map(Boolean));
  }
}
