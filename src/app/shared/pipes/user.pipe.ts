import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioModel } from '@core/models/user.model';
import { UserService } from '@core/services/user/user.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private userService: UserService) {

  }

  transform(value: string): Observable<UsuarioModel> {
    return this.userService.getUser(value);
  }

}
