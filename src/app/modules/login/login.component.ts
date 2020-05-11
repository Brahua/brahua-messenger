import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '@core/models/user.model';
import { AuthService } from '@core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UsuarioModel;
  rememberUser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = new UsuarioModel();
    this.rememberUser = false;
  }

  ngOnInit(): void {
    this.getRememberUser();
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando'
    });
    Swal.showLoading();

    this.authService.signIn(this.user.email, this.user.password)
      .then(response => {
        this.setRememberUser(loginForm.value);
        this.authService.setCurrentUser(response.user.uid);
        Swal.close();
        this.router.navigateByUrl('/main');
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
  }

  setRememberUser({ email, password }) {
    if (this.rememberUser) {
      localStorage.setItem('loginForm', JSON.stringify({ email, password }));
    }
  }

  getRememberUser() {
    if (localStorage.getItem('loginForm')) {
      this.user = JSON.parse(localStorage.getItem('loginForm'));
    }
  }
}
