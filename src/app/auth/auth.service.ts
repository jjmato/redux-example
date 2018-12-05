import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _afAuth: AngularFireAuth) {}

  createUser(name: string, email: string, password: string): Promise<void> {
    return this._afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  login(email: string, password: string): Promise<void> {
    return this._afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}
