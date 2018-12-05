import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { filter, flatMap, map, tap } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthService } from './../auth/auth.service';
import { SetMovesAction } from './moves.actions';
import { Move, mapAfDocChangesToMoves } from './moves.model';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
  constructor(
    private _afDB: AngularFirestore,
    private _authSrv: AuthService,
    private _appStore: Store<AppState>
  ) {}

  initMovesListener() {
    this._appStore
      .select('auth')
      .pipe(
        filter(auth => Boolean(auth.user)),
        map(auth => auth.user.uid),
        flatMap(uid =>
          this._afDB.collection(`${uid}/moves/moves`).snapshotChanges()
        ),
        map(docChange => mapAfDocChangesToMoves(docChange)),
        tap(moves => console.log(moves))
      )
      .subscribe((moves: Move[]) =>
        this._appStore.dispatch(new SetMovesAction(moves))
      );
  }

  createMove(move: Move): Promise<firebase.firestore.DocumentReference> {
    const uid = this._authSrv.user.uid;
    const promise = this._afDB
      .doc(`${uid}/moves`)
      .collection('moves')
      .add({ ...move });

    promise.then(resp => console.log(resp)).catch(err => console.error(err));

    return promise;
  }
}
