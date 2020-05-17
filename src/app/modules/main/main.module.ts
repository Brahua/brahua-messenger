import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@angular-material/angular-material.module';
import { ConversationComponent } from './conversation/conversation.component';
import { RequestComponent } from './request/request.component';


@NgModule({
  declarations: [MainComponent, ConversationComponent, RequestComponent],
  imports: [
    SharedModule,
    AngularMaterialModule,
    MainRoutingModule
  ]
})
export class MainModule { }
