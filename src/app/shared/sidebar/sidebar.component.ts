import { Subject } from "rxjs";
import { SetUserAction } from "./../../auth/auth.actions";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../../auth/auth.service";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { takeUntil, map, filter } from "rxjs/operators";
import { UnsetMovesAction } from "src/app/moves/moves.actions";

let k = 0;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject<void>();
  private _name: string;

  get name() {
    console.log("get name", k++);
    return this._name;
  }

  constructor(
    private _authSrv: AuthService,
    private _router: Router,
    private _appStore: Store<AppState>
  ) {}

  ngOnInit() {
    this._appStore
      .select("auth")
      .pipe(
        takeUntil(this._destroyed),
        map((state) => state.user),
        filter(Boolean)
      )
      .subscribe((user) => (this._name = user.name));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  logout() {
    this._authSrv
      .logout()
      .then((res) => {
        this._router.navigateByUrl("login");
        this._appStore.dispatch(new UnsetMovesAction());
      })
      .catch((err) => Swal("Error en el logout", err.message, "error"));
  }
}
