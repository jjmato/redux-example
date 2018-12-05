import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _afAuth: AngularFireAuth) {}

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
}
