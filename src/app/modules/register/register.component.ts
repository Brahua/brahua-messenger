import { UsuarioModel } from '@core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '@core/services/user/user.service';

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

  ngOnInit(): void {
    this.userService.getUsers();
  }

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando'
    });
    Swal.showLoading();


    this.authService.signUp(this.user.email, this.user.password)
      .then(data => {
        this.user.id = data.user.uid;
        return this.userService.addUser(this.user);
      })
      .then(response => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Operación completada',
          text: 'Se registró correctamente el usuario',
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
  }
}
