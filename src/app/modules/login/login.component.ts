import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '@core/models/user.model';
import { AuthService } from '@core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '@core/services/user/user.service';
import { MessageUtil } from '@core/utils/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UsuarioModel;
  rememberUser: boolean;
  installEvent = null;

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

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    console.log(event);
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser() {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice
        .theb(response => console.log(response));
    }
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    MessageUtil.loading();

    this.authService.signIn(this.user.email, this.user.password)
      .then(response => {
        this.setRememberUser(loginForm.value);
        this.authService.setCurrentUser(response.user.uid);
        Swal.close();
        this.router.navigateByUrl('/main');
      })
      .catch(error => MessageUtil.error(error.message));
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
