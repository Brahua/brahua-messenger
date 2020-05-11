import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@angular-material/angular-material.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    AngularMaterialModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
