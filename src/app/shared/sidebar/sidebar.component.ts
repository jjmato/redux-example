import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  constructor(private _authSrv: AuthService, private _router: Router) {}

  ngOnInit() {}

  logout() {
    this._authSrv
      .logout()
      .then(res => this._router.navigateByUrl('login'))
      .catch(err => Swal('Error en el logout', err.message, 'error'));
  }
}
