import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../auth/auth.service';
import { Move } from './moves.model';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
  constructor(private _afDB: AngularFirestore, private _authSrv: AuthService) {}

  createMove(move: Move): Promise<firebase.firestore.DocumentReference> {
    const uid = this._authSrv.user.uid;
    const promise = this._afDB
      .doc(`${uid}/moves`)
      .collection('items')
      .add({ ...move });

    promise
      .then(resp => console.log(resp))
      .catch(err => console.error(err));

    return promise;
  }
}
