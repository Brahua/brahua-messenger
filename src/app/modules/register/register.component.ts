import { UsuarioModel } from '@core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '@core/services/user/user.service';
import { MessageUtil } from '@core/utils/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UsuarioModel;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.user = new UsuarioModel();
  }

  ngOnInit(): void { }

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    MessageUtil.loading();

    this.authService.signUp(this.user.email, this.user.password)
      .then(data => {
        this.user.id = data.user.uid;
        return this.userService.addUser(this.user);
      })
      .then(response => MessageUtil.success('Se registró correctamente el usuario'))
      .catch(error => MessageUtil.error(error.message));
  }
}
