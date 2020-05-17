import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ConversationComponent } from './conversation/conversation.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: ':id', component: ConversationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
