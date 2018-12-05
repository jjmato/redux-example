import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, flatMap, map, takeUntil, tap } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import {
  ActiveLoadingAction,
  DeactiveLoadingAction
} from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { createUser, User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
  private _logout$ = new Subject<void>();

  get user(): User {
    return { ...this._user };
  }

  get isAuth$(): Observable<boolean> {
    return this._afAuth.authState.pipe(map(Boolean));
  }

  constructor(
    private _afAuth: AngularFireAuth,
    private _afDB: AngularFirestore,
    private _appStore: Store<AppState>
  ) {}

  initAuthListener() {
    this._afAuth.authState
      .pipe(
        takeUntil(this._logout$),
        filter(Boolean),
        flatMap((fbUser: firebase.User) =>
          this._afDB.doc(`${fbUser.uid}/user`).valueChanges()
        ),
        map(userFromFb => createUser({ ...userFromFb })),
        tap(user => console.log(user))
      )
      .subscribe(user => {
        this._user = user;
        this._appStore.dispatch(new SetUserAction(user));
      });
  }

  createUser(name: string, email: string, password: string): Promise<void> {
    this._appStore.dispatch(new ActiveLoadingAction());

    const newUserCredentialPromise = this._afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    newUserCredentialPromise.catch(err =>
      console.error('ERROR: createUserWithEmailAndPassword', err)
    );

    // TODO: rollback si falla creando datos usuario
    const createUserDataPromise = newUserCredentialPromise.then(
      userCredential => {
        console.log('user created! ', userCredential);
        const uid = userCredential.user.uid;
        const user = createUser({ name, uid, email });
        return this._afDB.doc(`${user.uid}/user`).set(user);
      }
    );
    createUserDataPromise
      .then(response => this._appStore.dispatch(new DeactiveLoadingAction()))
      .catch(err => {
        console.error('ERROR: user data', err);
        this._appStore.dispatch(new DeactiveLoadingAction());
      });

    return createUserDataPromise;
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    this._appStore.dispatch(new ActiveLoadingAction());
    const promise = this._afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    promise
      .then(response => {
        console.log(response);
        this._appStore.dispatch(new DeactiveLoadingAction());
      })
      .catch(err => {
        console.error(err);
        this._appStore.dispatch(new DeactiveLoadingAction());
      });
    return promise;
  }

  logout(): Promise<void> {
    this._appStore.dispatch(new ActiveLoadingAction());
    const logOutPromise = this._afAuth.auth.signOut();
    logOutPromise
      .then(res => {
        this._logout$.next();
        this._logout$.complete();
        this._appStore.dispatch(new DeactiveLoadingAction());
      })
      .catch(err => {
        this._appStore.dispatch(new DeactiveLoadingAction());
      });
    return logOutPromise;
  }
}
