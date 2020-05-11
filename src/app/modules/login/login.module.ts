import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@angular-material/angular-material.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    AngularMaterialModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
