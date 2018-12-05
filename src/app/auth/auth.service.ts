import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _afAuth: AngularFireAuth) {}

  createUser(name: string, email: string, password: string) {
    this._afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}
