import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '@core/services/request/request.service';
import { UsuarioModel } from '@core/models/user.model';
import { IRequest } from '@core/interfaces/request.interface';
import { MessageUtil } from '@core/utils/util';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() user: UsuarioModel;
  friendEmail: string;
  requests: IRequest[] = [];

  constructor(
    private requestService: RequestService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  sendRequestFriend() {
    MessageUtil.loading();
    const request: IRequest = {
      receiverEmail: this.friendEmail,
      sender: this.user.id,
      status: 'pending',
      timestamp: Date.now()
    };
    this.requestService.createRequest(request)
      .then(() => MessageUtil.success('Solicitud enviada correctamente'))
      .catch(error => MessageUtil.error(error.message));
  }

  getRequests() {
    this.requestService.getRequests(this.user.email)
      .subscribe((requests: IRequest[]) => {
        this.requests = requests;
      });
  }

  respondRequest(request: IRequest, status: boolean) {
    request.status = status ? 'accept' : 'denied';
    this.requestService.setRequest(request)
      .then(() => {
        return this.userService.addFriend(this.user.id, request.sender);
      }).then(() => {
        return this.requestService.deleteRequest(request);
      }).then(() => {
        MessageUtil.success('Solicitud respondida');
      })
      .catch(error => MessageUtil.error(error.message));
  }

}
